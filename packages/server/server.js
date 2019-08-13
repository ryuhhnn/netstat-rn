const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver").v1;

const port = 3000;
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

app.use(cors());
app.use(bodyParser.json());

require("./routes/device")(app, session, driver);

app.get("/", (req, res) => res.send("NetStat RN!"));

app.listen(port, () => console.log(`NetStat RN listening on port ${port}!`));
