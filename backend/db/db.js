const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://rushi:kSxXu79uMc7Jwr39@todo.ka40ttd.mongodb.net/test";

const databaseConnect = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then((mongoConnected) => {
      console.log(`Database is connected successfully`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = databaseConnect