const mongoose = require("mongoose");
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
  password: {
    type: String,
    required: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
