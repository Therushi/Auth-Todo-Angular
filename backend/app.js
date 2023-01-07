const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookie = require("cookie-parser");
const passport = require("passport");


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(cookie());
app.use(passport.initialize());
require('./auth/auth')

app.use("/", todoRoutes);
app.use("/auth", authRoutes);

module.exports = app;
