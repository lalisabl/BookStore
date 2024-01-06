const process = require("../../Config/config");

const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const passport = require("passport");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const generateUniqueUsername = async (email) => {
  const baseUsername = email.split("@")[0];
  let username;
  let isUsernameTaken = true;
  while (isUsernameTaken) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    username = `${baseUsername}${randomNumber}`;
    const existingUser = await User.findOne({ username });
    isUsernameTaken = !!existingUser;
  }
  return username;
};
exports.createNewAccount = catchAsync(async (req, res) => {
  const generatedUsername = await generateUniqueUsername(req.body.email);
  const newUser = await User.create({
    email: req.body.email,
    username: generatedUsername,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

exports.loginUsers = catchAsync(async (req, res, next) => {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 15 minutes in milliseconds
  const { email, username, password } = req.body;
  if ((email && username) || (!email && !username) || !password) {
    return next(
      new AppError("Please provide valid email/username and password!", 400)
    );
  }
  let user;
  if (email) {
    user = await User.findOne({ email });
  } else {
    user = await User.findOne({ username });
  }
  if (!user) {
    return next(new AppError("Invalid email/username.", 401));
  }
  if (!user.isActive) {
    return next(new AppError("You are banned by the admin!", 403));
  }
  if (user.isLocked) {
    if (user.lockedUntil > Date.now()) {
      return next(
        new AppError("Account is locked. Please try again later!", 401)
      );
    } else {
      user.loginAttempts = 0;
      user.isLocked = false;
      user.lockedUntil = null;
      await user.save();
    }
  }
  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    user.isLocked = true;
    user.lockedUntil = Date.now() + LOCKOUT_DURATION;
    await user.save();
    return next(
      new AppError("Account is locked. Please try again later!", 401)
    );
  }
  if (email) {
    user = await User.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ username }).select("+password");
  }
  if (!(await user.validatePassword(password, user.password))) {
    user.loginAttempts++;
    await user.save();
    return next(new AppError("Incorrect password", 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("No user is belongs to this token", 401));
  }
  req.user = currentUser;
  next();
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
});
exports.restrictsto = (role) => {
  return (req, res, next) => {
    if (!(role === req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to this perform this action!",
          403
        )
      );
    }
    next();
  };
};
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.validatePassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  createSendToken(user, 200, res);
});
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
exports.resetPassword = async (req, res, next) => {};

// Initialize Passport Google Strategy
exports.CreateGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: "http://localhost:5000/api/v1/users/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              fullName: profile.displayName,
              googleId: profile.id,
            });
            await user.save();
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

exports.googleSignInRedirect = (req, res) => {
  const user = req.user;
  const token = createSendToken(user, 200, res);
};
