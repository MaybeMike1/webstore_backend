const Mongoose = require("mongoose");
const { Model, modelSchema, validate } = require("./../Models/model");

const modelService = {};

async function getOne(_id) {
  const model = await Model.findById(_id);
  if (!model) {
    return "No models found with id", _id;
  }
  return model;
}

async function getAll() {
  const models = await Model.find({});
  if (models.length == 0) {
    return "No Content";
  }

  return models;
}

async function deleteById(_id) {
  const deletedModel = await Model.deleteOne({ _id: _id })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
}

async function createOne(req) {
  const data = req.body;
  const {errors} = validate(data);
  if (errors) return errors.details[0];
  const savedModel = await Model.create({
    _id: new Mongoose.Types.ObjectId(),
    modelName: req.body.modelName,
  });

  return savedModel;
}

modelService.createOne = createOne;
modelService.deleteById = deleteById;
modelService.getAll = getAll;
modelService.getOne = getOne;

module.exports = modelService;
