const mongoose = require("mongoose");
bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: String,
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    select: false,
  },
  fullName: {
    type: String,
    default: "",
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  profile: {
    picture: {
      type: String,
      default: "profile_picture_url",
    },
    bio: {
      type: String,
      default: "User bio goes here",
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        default: [],
      },
    ],
    reading_history: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "Book",
        },
        last_read: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = 10; // Number of salt rounds for bcrypt
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});
userSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
