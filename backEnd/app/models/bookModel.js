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
  downloadable: { type: Boolean, default: true },
  upload_date: { type: Date, default: Date.now },

  rating: [
    {
      avgRate: { type: Number, default: 0 },
      numRates: { type: Number, default: 0 },
    },
  ],
  reviews: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  downloads: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
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

  if (!this.rating || !this.rating[0]) {
    this.rating = [
      {
        avgRate: 0,
        numRates: 0,
      },
    ];
  }

  const totalReviews = this.reviews.length;
  const sumRatings = this.reviews.reduce((sum, r) => sum + r.rating, 0);

  this.rating[0].avgRate = (sumRatings / totalReviews).toFixed(2);
  this.rating[0].numRates = totalReviews;

  await this.save();
};

/* The `bookSchema.methods.addDownload` function is a method that is added to the `bookSchema` object.
It is used to increment the `downloads` field of a book document by 1 and save the updated document
to the database. */

bookSchema.methods.addDownload = async function () {
  this.downloads += 1;
  await this.save();
};

bookSchema.methods.addShare = async function () {
  this.shares += 1;
  await this.save();
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
