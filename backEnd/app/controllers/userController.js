const User = require("../models/UserModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const { trusted } = require("mongoose");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("picture");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);
  next();
});
// update user profile
exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const { fullName, username, bio, notifications, favorites, reading_history } =
    req.body;
  const picture = req.file.filename;
  if (fullName) user.fullName = fullName;
  if (username) user.username = username;
  if (bio) user.profile.bio = bio;
  if (favorites) user.profile.favorites = favorites;
  if (notifications) user.profile.notifications = notifications;
  if (reading_history) user.profile.reading_history = reading_history;
  if (picture) user.profile.picture = picture;
  const updatedUser = await user.save();
  res.status(200).json({
    status: "success",
    data: { updatedUser },
  });
});
// get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    totalUser: users.length,
    data: {
      users: users,
    },
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});
// get eachuser
exports.getOneUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.userId);
  const user = await query;
  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
// deleting a user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`There is no user with ${userId} _id`);
    }
    user.isActive = user.isActive == true ? false : true;
    await user.save();
    return res.status(204).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.signupValidation = catchAsync(async (req, res) => {
  const respondAvailabilty = (existingUser) => {
    if (existingUser) {
      // the email or the username is taken
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  };
  let username;
  let email;
  if (req.query.username) {
    email = null;
    username = req.query.username;
    console.log("hello from username", req.query.username);
    const existingUsername =
      (await User.findOne({ username })) === null ? false : true;
    respondAvailabilty(existingUsername);
    console.log(existingUsername);
  }
  if (req.query.email) {
    username = null;
    email = req.query.email;
    console.log("hello from email", email);
    const existingEmail =
      (await User.findOne({ email })) === null ? false : true;
    console.log(existingEmail);
    respondAvailabilty(existingEmail);
  }
});
