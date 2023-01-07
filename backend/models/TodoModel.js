const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    userId:{
      type: ObjectId,
    },
    task: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
