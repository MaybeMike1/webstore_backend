const router = require("express").Router();
const modelService = require("./../Service/modelService");

router.get("/", async (req, res) => {
  const models = await modelService
    .getAll()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() });
    });
});

router.post("/create", async (req, res) => {
  await modelService
    .createOne(req)
    .then((result) => {
      res.status(201).send({ data: result });
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() });
    });
});

module.exports = router;
