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
  console.log(req.file.filename);
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
  let picture;
  if (req.file) picture = req.file.filename;
  if (fullName) user.profile.fullName = fullName;
  if (username) user.username = username;
  if (bio) user.profile.bio = bio;
  if (favorites) {
    user.profile.favorites.addToSet(favorites);
  }
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
    users: users,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});
// get eachuser
exports.getOneUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.userId)
    .populate({
      path: "followers",
      select: "username fullName profile.picture",
    })
    .populate({
      path: "following",
      select: "username fullName profile.picture",
    })
    .exec();
  const user = await query;
  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
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

  if (req.query.username) {
    username = req.query.username;
    const existingUsername =
      (await User.findOne({ username })) === null ? false : true;
    respondAvailabilty(existingUsername);
  }
  if (req.query.email) {
    email = req.query.email;
    const existingEmail =
      (await User.findOne({ email })) === null ? false : true;
    respondAvailabilty(existingEmail);
  }
});
const followUnfollowUser = async (req, res, action) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;
    const followedUser = await User.findById(userId);
    const followerUser = await User.findById(followerId);

    if (followedUser && followerUser) {
      if (followerId !== userId) {
        const numFollowers = followedUser.followers.length;
        const numFollowing = followerUser.following.length;

        const updateFollowedUser =
          action === "follow"
            ? {
                $addToSet: { followers: followerId },
                $set: { numFollowers: numFollowers + 1 },
              }
            : {
                $pull: { followers: followerId },
                $set: { numFollowers: numFollowers - 1 },
              };

        const updateFollowerUser =
          action === "follow"
            ? {
                $addToSet: { following: userId },
                $set: { numFollowing: numFollowing + 1 },
              }
            : {
                $pull: { following: userId },
                $set: { numFollowing: numFollowing - 1 },
              };

        await User.findByIdAndUpdate(userId, updateFollowedUser, { new: true });
        await User.findByIdAndUpdate(followerId, updateFollowerUser, {
          new: true,
        });
        const successMessage =
          action === "follow"
            ? "User followed successfully."
            : "User unfollowed successfully.";
        res.status(200).json({ success: true, message: successMessage });
      } else {
        res.status(400).json({
          success: false,
          error: "Sorry,you couldn't follow yourself",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error: "Sorry,we couldn't find any user associated with this ID",
      });
    }
  } catch (error) {
    console.error(
      `Error ${action === "follow" ? "following" : "unfollowing"} user:`,
      error
    );
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.followUser = async (req, res) => {
  await followUnfollowUser(req, res, "follow");
};

exports.unfollowUser = async (req, res) => {
  await followUnfollowUser(req, res, "unfollow");
};

exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("followers", "username"); // Populate followers with only usernames

    res.status(200).json({ success: true, followers: user.followers });
  } catch (error) {
    console.error("Error getting followers:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("following", "username"); // Populate following with only usernames

    res.status(200).json({ success: true, following: user.following });
  } catch (error) {
    console.error("Error getting following:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
