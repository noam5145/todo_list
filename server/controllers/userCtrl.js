const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userCtrl = {
  //admin panel
  async setUser(req, res) {
    try {
      let newUser = await userModel.findOne({ username: req.body.username });
      if (newUser) {
        return res.status(400).json({ error: "username already exists" });
      }
      const payload = { username: req.body.username };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
      req.body.token = token;
      newUser = userModel(req.body);
      newUser.save();
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
    }
  },
  async getUser(req, res) {
    try {
      let theUser = await userModel.findOne({ username: req.query.username });
      if (theUser) {
        res.status(200).json(theUser);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getUsers(req, res) {
    try {
      if (req.query.access === "admin") {
        const newUser = await userModel.findOne({
          username: req.query.username,
        });
        if (newUser.access === "admin") {
          const users = await userModel.find({});
          return res.status(200).json(users);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
