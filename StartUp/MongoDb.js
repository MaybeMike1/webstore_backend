const Mongoose = require("mongoose");
require("dotenv").config();
module.exports = async function () {
  Mongoose.syncIndexes();
  return await Mongoose.connect(
    process.env.MONGO_CON,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (error) throw error;
      console.log("Connected to MongoDB...");
      Mongoose.set("debug", true);
    }
  );
};
