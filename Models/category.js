const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const categorySchema = new Schema({
  category: { type: String, required: true},
});

const Category = Mongoose.model("Category", categorySchema);

module.exports = {
  Category,
  categorySchema,
};
