const Todo = require("../models/TodoModel");

exports.home = (req, res) => {
  res.send("Hello from Rushi");
};

exports.createTodo = async (req, res) => {
  const retObj = {};
  try {
    console.log(req.body, "request");
    const { title, task, userId } = req.body;

    if (!(title && task && userId)) {
      retObj.status = false;
      retObj.message = "Please insert title & task";
      return res.send(300).send(retObj);
    }

    const todo = await Todo.create({ title, task, userId });

    retObj.status = true;
    retObj.message = "Inserted todo Successfully";
    retObj.data = todo;
    res.status(200).json(retObj);
  } catch (error) {
    console.log(error.message, "Error");
    retObj.status = false;
    retObj.message = error.message;
    res.status(400).json(retObj);
  }
};

exports.getAllTodo = async (req, res) => {
  const retObj = {};
  try {
    const { userId } = req.body;

    const todo = await Todo.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
    ]);

    retObj.status = true;
    retObj.message = "All Task fetch successfully";
    retObj.data = todo;
    res.status(200).json(retObj);
  } catch (error) {
    console.log(error.message, "Error");
    retObj.status = false;
    retObj.message = error.message;
    res.status(400).json(retObj);
  }
};

exports.editTodo = async (req, res) => {
  const retObj = {};
  try {
    // const id = req.body.id;
    // const index = req.params["index"] || req.body.index;
    // const { id, index, task } = req.body;
    const { id, title, task } = req.body;
    console.log(id, "id");

    if (!id) throw new Error("No id Found");
    if (!title || !task) throw new Error("No updated Data Found");

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, task },
      (error, docs) => {
        if (error) {
          console.log(error);
        } else {
          console.log(docs);
        }
      }
    ).clone();

    // const todo = await Todo.findOne({"_id": id});

    // todo.task[index] = task;
    // await todo.save();

    retObj.status = true;
    retObj.message = "Inserted todo Successfully";
    retObj.data = todo;
    res.status(200).json(retObj);
  } catch (error) {
    console.log(error.message, "Error");
    retObj.status = false;
    retObj.message = error.message;
    res.status(400).json(retObj);
  }
};

exports.deleteTodo = async (req, res) => {
  const retObj = {};
  try {
    const id = req.params["id"] || req.body.id;
    console.log(id);
    if (!id) throw new Error("No todo Found");

    const todo = await Todo.findByIdAndDelete(id, (err, doc) => {
      if (!err) {
        retObj.status = true;
        retObj.message = "Deleted todo Successfully";
      } else {
        retObj.status = false;
        retObj.message = err.message;
      }
    }).clone();

    res.status(200).json(retObj);
  } catch (error) {
    console.log(error.message, "Error");
    retObj.status = false;
    retObj.message = error.message;
    res.status(400).json(retObj);
  }
};
