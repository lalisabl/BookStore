const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  relatedBook: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
