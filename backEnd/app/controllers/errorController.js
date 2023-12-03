const AppError = require("../../utils/catchAsync");
let message = null;
const handleJWTError = () => {
  return new AppError("Invalid token.Please log in again!", 401);
};
const handleJWTExpiredError = () => {
  return new AppError("Your token is expired, please login again!", 401);
};
handleCastErrorDB = (err) => {
  message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(400, message);
};
handleDuplicateFieldError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  message = `Duplicate key error. The value '${err.keyValue[field]}' for field '${field}' is already in use.`;
  return new AppError(400, message);
};
handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  message = `Invalid input data: ${errors.join(".")}`;
  return new AppError(400, message);
};
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.kind === "ObjectId") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldError(error);
    if (error._message === "Product validation failed")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }
    sendErrorProd(error, res);
  }
  next();
};
