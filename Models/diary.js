const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const diaryModel = new Schema({
  createDate: { type: Date, required: true },
  headerLine: { type: String, required: false },
  content: { type: String, required: true },
});

const Diary = Mongoose.model("Diary", diaryModel);

module.exports.Diary = Diary;
