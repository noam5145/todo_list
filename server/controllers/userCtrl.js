const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
require("dotenv").config();

exports.userCtrl = {
  //admin panel
  async setUser(req, res) {
    try {
      let admin = await userModel.findOne({token: req.body.adminToken});
      if(admin){
        if(admin.access === 'admin'){
          let newUser = await userModel.findOne({ username: req.body.username });
          if (newUser) {
            return res.status(400).json({ error: "username already exists" })
          }
          const payload = { username: req.body.username };
          const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
          req.body.token = token;
          newUser = userModel(req.body);
          newUser.save();
          let user = {...req.body};
          delete user.adminToken;
          res.status(200).json(user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getUser(req, res) {    
    try {      
      if(req.query.username && req.query.id){
        let theUser = await userModel.findOne({ username: req.query.username, id: req.query.id });
        if (theUser) {
          res.status(200).json(theUser);
        }
      } else {
        return res.status(402).json({err: 'valid Email or client ID'});
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
const verifyToken = (client_id, token)=>{
const client = new OAuth2Client(client_id);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client_id,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return true;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);
}