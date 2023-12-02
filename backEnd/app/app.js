const express = require("express");
const app = express();
require("../Config/db");
const cors = require("cors"); 

app.use(
    cors({
      origin: "http://localhost:5173", // Set the allowed origin
      credentials: true, // Allow cookies and authentication headers
    })
  );

// user routing api links are listed below
const userRoute = require("./Routers/UserRouter");
app.use("/api/v1/users/", userRoute);

module.exports = app;
