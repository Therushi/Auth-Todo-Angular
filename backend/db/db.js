const mongoose = require("mongoose");

const MONGO_URI = "MONGO_URI"

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
