const router = require("express").Router();
const brandService = require("./../Service/brandService");

router.get("/", async (req, res) => {
  await brandService
    .getBrand()
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((error) => {
      res.status(201).send({ message: error.toString() });
    });
});

module.exports = router;
