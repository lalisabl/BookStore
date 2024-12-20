const mongoose = require("mongoose");
const process = require("./config.js");
const dbUrl = process.env.dbUrl;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = mongoose.connection;
