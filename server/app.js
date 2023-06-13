const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// require('../firebaseC');
const {routesInit} = require('./routes/configRoutes')
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
  })
);
routesInit(app);

app.listen(process.env.PORT, (err) => {
  if(err) return console.log(err);
  
  console.log("Server - running.");
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB - connected.");
  })
  .catch((err) => {
    console.log(err);
  });
