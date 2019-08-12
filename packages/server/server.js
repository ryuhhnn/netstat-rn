const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver").v1;
const uuidv4 = require("uuid/v4");

const port = 3000;
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("NetStat RN!"));

app.post("/device/add", async (req, res) => {
  const id = uuidv4();
  const name = req.body.name;
  const type = req.body.type;
  const result = await session.run(
    "CREATE (a:Device {id: $id, name: $name, type: $type}) RETURN a",
    { id: id, name: name, type: type }
  );

  session.close();

  res.json(
    result.records.map(result => {
      const record = result.get(0);
      return {
        id: record.properties.id,
        name: record.properties.name,
        type: record.properties.type
      };
    })
  );

  driver.close();
});

app.get("/device/list", async (req, res) => {
  const results = await session.run("MATCH (n:Device) RETURN n");

  session.close();

  res.json(
    results.records.map(result => {
      const record = result.get(0);
      return {
        id: record.properties.id,
        name: record.properties.name,
        type: record.properties.type
      };
    })
  );

  driver.close();
});

app.post("/device/connect", async (req, res) => {
  const parentId = req.body.parentId;
  const childId = req.body.childId;
  const result = await session.run(`
    MATCH (p:Device),(c: Device)
    WHERE p.id = "${parentId}" AND c.id = "${childId}"
    CREATE (p)-[r:CONNECTS_TO]->(c)
    RETURN r
  `);

  session.close();

  res.json(
    result.records.map(result => {
      const record = result.get(0);
      return {
        id: record.properties.id,
        name: record.properties.name,
        type: record.properties.type
      };
    })
  );

  driver.close();
});

app.listen(port, () => console.log(`NetStat RN listening on port ${port}!`));
