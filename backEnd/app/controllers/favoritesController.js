const User = require("../models/UserModel");
const Book = require("../models/bookModel");
const Notification = require("../models/notificationModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
exports.addToFavorites = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { "profile.favorites": req.params.bookId } },
      { new: true }
    ).populate("profile.favorites");

    // Create a notification for the user who uploaded the book
    // const book = await Book.findById(req.params.bookId);
    // if (book && book.user) {
    //   const notification = await Notification.create({
    //     message: `${req.user.username} added your book to favorites.`,
    //     relatedBook: req.params.bookId,
    //     sender: req.user.id,
    //   });
    //   await User.findByIdAndUpdate(
    //     book.user,
    //     { $addToSet: { "profile.notifications": notification._id } },
    //     { new: true }
    //   );
    // }

    res.status(201).json({ status: "success", data: user.profile.favorites });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "profile.favorites",
      populate: {
        path: "user",
        select:
          "email created_at username profile.picture profile.bio  fullName",
      },
    });
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
