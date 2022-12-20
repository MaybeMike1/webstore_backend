const string = require("@hapi/joi/lib/types/string");
const Mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema } = Mongoose;

const modelSchema = new Schema({
  modelName: { type: string, required: true},
});

const Model = Mongoose.model("Model", modelSchema);

function validate(model) {
  const schema = Joi.object({
    modelName: Joi.string().max(100).required(),
  });

  return schema.validate(model);
}

module.exports = {
  modelSchema,
  Model,
  validate,
};
