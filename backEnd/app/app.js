const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
require("../Config/db");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

// body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

// user routing api links are listed below
const userRoute = require("./Routers/UserRouter");
app.use("/api/v1/users/", userRoute);

// book routing api links are listed below
const bookRoute = require("./Routers/bookRouter");
app.use("/api/v1/books/", bookRoute);

app.use(globalErrorHandler);
module.exports = app;
