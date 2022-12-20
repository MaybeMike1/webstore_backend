const Mongoose = require("mongoose");
const { Schema } = Mongoose;
const { Category, categorySchema } = require("./category");
const { Brand, brandSchema } = require("./brand");
const { Model, modelSchema } = require("./model");
const Joi = require("@hapi/joi");

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  brand: { type : Schema.Types.ObjectId, ref: 'Brand' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  model: { type: Schema.Types.ObjectId, ref: 'Model' },
});


function validate(product) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    model: Joi.string().required(),
  });

  return schema.validate(product);
}

const Product = Mongoose.model("Product", productSchema);

module.exports = {
  Product,
  productSchema,
  validate
};
