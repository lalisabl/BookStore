const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  filename: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Poetry",
      "Drama",
      "Children's Books",
      "Religion/Spirituality",
      "Science Fiction/Fantasy",
      "Mystery/Thriller",
      "Romance",
      "History",
      "Reference",
      "Humor/Satire",
      "Graphic Novels/Comics",
      "Science",
      "Travel",
      "Art/Photography",
      "Education",
      "Politics/Social Sciences",
      "Sports",
      "Philosophy",
    ],
    required: true,
  },
  thumbnail: String,
  upload_date: { type: Date, default: Date.now },
  rating: { type: Number, required: true, default: 0 },
  reviews: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  downloads: { type: [String] },
  shares: { type: [String] },
  reports: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      reportType: {
        type: String,
        enum: [
          "nudity",
          "violence",
          "hate-speech",
          "spam",
          "copyright-violation",
          "misinformation",
          "harassment",
          "other",
        ],
        required: true,
      },
      moreDetail: String,
    },
  ],
});

bookSchema.methods.addReview = async function (user_id, rating, comment) {
  const existingReview = this.reviews.find(
    (r) => String(r.user_id) === String(user_id)
  );

  if (existingReview) {
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    this.reviews.push({ user_id, rating, comment });
  }
  await this.save();
};

bookSchema.methods.addRating = async function (rating) {

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }
  const totalRatings = this.reviews.length;
  const sumRatings = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = sumRatings / totalRatings;

  this.rating = averageRating;

  await this.save();
};



const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
