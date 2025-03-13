const userModel = require("../models/user-model");
const adminModel = require("../models/admin-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerAdmin = async (req, res) => {
  try {
    let admin = await adminModel.find();
    if (admin.length > 0) {
      return res
        .status(400)
        .send("You are not allowed to create another admin");
    }
    let { fullname, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        }
        let newAdmin = await adminModel.create({
          fullname,
          email,
          password: hash,
        });
        res.status(200).send("Admin created successfully");
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await adminModel.findOne({
      email,
    });
    if (!admin) {
      return res.status(400).send("Invalid credentials");
    }
    bcrypt.compare(password, admin.password, (err, result) => {
      if (err) {
        return res.send(err.message);
      }
      if (result) {
        const token = generateToken(admin);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send("Login successful");
      } else {
        res.status(400).send("Invalid credentials");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;
    if (!fullname || !email || !password || !contact) {
      return res.status(400).send("Please fill all the fields");
    }
    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        }
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
          contact,
        });
        res.status(200).send("User created successfully");
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
    }
    let user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.send(err.message);
      }
      if (result) {
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send("Login successful");
      } else {
        res.status(400).send("Invalid credentials");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
};
