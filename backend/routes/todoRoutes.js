const express = require("express");
const {
  home,
  createTodo,
  getAllTodo,
  editTodo,
  deleteTodo,
} = require("../controller/todoController");
const router = express.Router();
const passport = require("passport");

router.get("/home", passport.authenticate("jwt", { session: false }), home);
router.post(
  "/createTodo",
  passport.authenticate("jwt", { session: false }),
  createTodo
);
router.post(
  "/getAllTodo",
  passport.authenticate("jwt", { session: false }),
  getAllTodo
);
router.post(
  "/editTodo",
  passport.authenticate("jwt", { session: false }),
  editTodo
);
router.post(
  "/deleteTodo",
  passport.authenticate("jwt", { session: false }),
  deleteTodo
);

module.exports = router;
