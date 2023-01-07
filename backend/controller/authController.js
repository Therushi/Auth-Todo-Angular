const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const saltRounds = 10;

exports.registerUser = async (req, res) => {
  const retObj = {};
  try {
    const { userName, email, password } = req.body;

    if (!(userName && email && password)) {
      retObj.error = "All fields required";
      res.status(401).send(retObj);
    }

    // Checking for User Exists or Not
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      retObj.status = false;
      retObj.message = "User Already register";
      return res.status(400).send(retObj);
    }

    // Encrypt password and Store
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      userName,
      email,
      password: encryptedPassword,
    });

    user.password = undefined;
    retObj.status = true;
    retObj.mssage = "User Created Sucessfully";
    retObj.user = user;
    res.status(200).json(retObj);
  } catch (error) {
    retObj.status = false;
    retObj.message = error;
    res.status(405).json(retObj);
  }
};

exports.userLogin = async (req, res) => {
  const retObj = {};
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      retObj.status = false;
      retObj.message = "All Fields are required";
      return res.status(401).send(retObj);
    }

    // check if user is register or not
    const userExist = await User.findOne({ email });
    if (!userExist) {
      retObj.status = false;
      retObj.message = "Please register to Login";
      return res.status(403).send(retObj);
    }

    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      // // creating token & Send to user
      const token = jwt.sign(
        { id: userExist._id, email },
        process.env.JWT_SECRET_KEY,
        { algorithm: "HS256", expiresIn: "2h" }
      );

      userExist.password = undefined;
      retObj.token = token;

      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
      retObj.status = true;
      retObj.message = "Login Sucessfull";
      retObj.user = userExist;
      return res.cookie("token", token, options).send(retObj);
    } else {
      retObj.status = false;
      retObj.message = "Please Check your credentials";
      return req.status(403).send(retObj);
    }
  } catch (error) {
    retObj.status = false;
    retObj.error = error;
    return res.status(405).send(retObj);
  }
};
