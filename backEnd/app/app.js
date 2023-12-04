const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
require("../Config/db");
const globalErrorHandler = require("./controllers/errorController");
const userRoute = require("./Routers/UserRouter");
const bookRoute = require("./Routers/bookRouter");
const favoriteRoute = require("./Routers/favoritesRoute");
const cors = require("cors");

// body parser
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/v1/users/", userRoute);

app.use("/api/v1/books/", bookRoute);
app.use("/api/v1/favorites", favoriteRoute);
app.use(globalErrorHandler);
module.exports = app;
