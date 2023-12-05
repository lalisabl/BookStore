const User = require("../models/UserModel");
const Notification = require("../models/notificationModel");

exports.getNotifications = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate(
      "profile.notifications"
    );
    res
      .status(200)
      .json({ status: "success", data: user.profile.notifications });
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const { actionType, bookId } = req.body;

    let notificationMessage;

    switch (actionType) {
      case "rating":
        notificationMessage = "You received a new book rating!";
        break;
      case "review":
        notificationMessage = "You received a new book review!";
        break;
      case "discussion":
        notificationMessage =
          "Someone created a new discussion for a book you uploaded!";
        break;
      default:
        break;
    }
    const newNotification = await Notification.create({
      message: notificationMessage,
      relatedBook: bookId,
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { "profile.notifications": newNotification._id } },
      { new: true }
    ).populate("profile.notifications");

    res
      .status(201)
      .json({ status: "success", data: user.profile.notifications });
  } catch (error) {
    next(error);
  }
};
