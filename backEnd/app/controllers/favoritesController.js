const User = require("../models/UserModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
exports.addToFavorites = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { "profile.favorites": req.params.bookId } },
      { new: true }
    ).populate("profile.favorites");
    res.status(201).json({ status: "success", data: user.profile.favorites });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("profile.favorites");
    res.status(200).json({ status: "success", data: user.profile.favorites });
  } catch (error) {
    next(error);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { "profile.favorites": req.params.bookId } },
      { new: true }
    ).populate("profile.favorites");
    res.status(200).json({ status: "success", data: user.profile.favorites });
  } catch (error) {
    next(error);
  }
};
