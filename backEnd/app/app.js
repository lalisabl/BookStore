const express = require("express");
const app = express();
require("../Config/db");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");
// body parser
app.use(express.json());
// user routing api links are listed below
const userRoute = require("./Routers/UserRouter");
app.use("/api/v1/users/", userRoute);
app.use(globalErrorHandler);
module.exports = app;
