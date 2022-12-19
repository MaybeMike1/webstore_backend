const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Brand = Mongoose.model("Brand", brandSchema);

module.exports = { Brand, brandSchema };
