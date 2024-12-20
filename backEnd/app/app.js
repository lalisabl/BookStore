const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
require("../Config/db");
const globalErrorHandler = require("./controllers/errorController");
const userRoute = require("./Routers/UserRouter");
const bookRoute = require("./Routers/bookRouter");
const favoriteRoute = require("./Routers/favoritesRoute");
const notificationRoute = require("./Routers/notificationRouter");
const cors = require("cors");

// global parser
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
//global Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Set the allowed origin
    credentials: true, // Allow cookies and authentication headers
  })
);
// route middlewares
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/books/", bookRoute);
app.use("/api/v1/favorites", favoriteRoute);
app.use("/api/v1/notification", notificationRoute);

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(globalErrorHandler);
module.exports = app;
