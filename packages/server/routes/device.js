const uuidv4 = require("uuid/v4");

module.exports = (app, session, driver) => {
  // Add device to network
  app.post("/device/add", async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const type = req.body.type;
    const status = req.body.status;

    let result;

    try {
      result = await session.run(
        "CREATE (a:Device {id: $id, name: $name, type: $type, status: $status}) RETURN a",
        { id: id, name: name, type: type, status: status }
      );
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    res.json(result.records.map(result => result.get(0)));

    driver.close();
  });

  // List devices on network
  app.get("/device/list", async (req, res) => {
    let results;

    try {
      results = await session.run("MATCH (n:Device) RETURN n");
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    res.json(results.records.map(result => result.get(0)));

    driver.close();
  });

  // Get by ID
  app.get("/device/get", async (req, res) => {
    const nodeId = req.query.id;
    let results;

    try {
      results = await session.run("MATCH (n:Device {id: $id}) RETURN n", {
        id: nodeId
      });
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    // spreading this result because there's only one object
    if (results) res.json(...results.records.map(result => result.get(0)));
    else res.status(501).send({});

    driver.close();
  });

  // Get relationships by ID
  app.get("/device/children", async (req, res) => {
    const id = req.query.id;
    let results;

    try {
      results = await session.run(`
      MATCH (n:Device)<-[r:CONNECTS_TO]-(n2:Device)
      WHERE n2.id = "${id}"
      RETURN n, r, n2
    `);
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    let graph = { node: {}, children: [] };

    if (results.records.length > 0) {
      results.records.forEach(result => {
        const record = result.toObject();
        graph.node = record.n2;
        graph.children.push(record.n);
      });
      res.json(graph);
    } else {
      res.json({});
    }

    driver.close();
  });

  // Connect two devices
  app.post("/device/connect", async (req, res) => {
    const parentId = req.body.parentId;
    const childId = req.body.childId;
    let result;
    try {
      result = await session.run(`
        MATCH (p:Device),(c: Device)
        WHERE p.id = "${parentId}" AND c.id = "${childId}"
        CREATE (p)-[r:CONNECTS_TO]->(c)
        RETURN r
      `);
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    res.json(result.records.map(result => result.get(0)));

    driver.close();
  });

  // Set the status of a device
  app.post("/device/status", async (req, res) => {
    const node = req.body.id;
    const status = req.body.status;

    let result;

    try {
      result = await session.run(
        `
        MATCH (d:Device {id: $id})
        SET d.status = "${status}"
        RETURN d
      `,
        { id: node }
      );
    } catch (e) {
      console.error(e);
      res.json(e);
    }

    session.close();

    // spreading this result because there's only one object
    if (result) res.json(...result.records.map(result => result.get(0)));
    else res.status(501).send({});

    driver.close();
  });
};
