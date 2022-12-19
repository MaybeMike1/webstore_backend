const router = require("express").Router();
const Mongoose = require("mongoose");
const { Category } = require("../Models/category");
const categoryService = require("./../Service/categoryService");
const admin = require("./../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).send({ data: categories });
});

router.get("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;
  const category = await categoryService.findById(id);
  console.log(category);
  if (!category) {
    return res
      .status(404)
      .send({ message: `Category with Category - ${category} was not found` });
  }
  res.status(200).send({ data: category });
});

router.put("/:id", [auth, admin], (req, res) => {
  categoryService
    .updateById(req.params.id, req.body)
    .then(() => {
      res.status(201).send({ message: "Successfully updated" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() });
    });
});

router.post("/create", [auth, admin], async (req, res) => {
  let _id = new Mongoose.Types.ObjectId();
  const data = { category: req.body.category, _id: _id };
  await Category.create(data)
    .then((result) => {
      res.status(201).send({ message: "Successfully created", result });
    })
    .catch((error) => {
      res.status(500).send({ error: error.toString() });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await categoryService
    .deleteById(id)
    .then((result) => {
      res.status(201).send({ message: "Succesfully deleted", result });
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() });
    });
});

module.exports = router;
