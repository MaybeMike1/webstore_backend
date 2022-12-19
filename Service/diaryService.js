const Mongoose = require("mongoose");
const diaryModel = require("./../Models/diary");
const connection = require("./../StartUp/MongoDb");

const diaryService = {};

async function deleteDiary(id) {
  connection();
  const diary = await diaryModel.deleteOne({ $where: (_id = id) });

  Mongoose.disconnect();

  return diary;
}

async function createDiary(req) {
  connection();

  const diary = await diaryModel.create({
    createDate: new Date(),
    headerLine: "test",
    content: "something else",
  });

  Mongoose.disconnect();

  return diary;
}

diaryService.create = createDiary;
diaryService.deleteOne = deleteDiary;

module.exports = diaryService;
