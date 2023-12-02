const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  categories: { type: [String] },
  upload_date: { type: Date, default: Date.now },

  ratings: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number }
    }
  ],
  
  reviews: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],

  downloads: { type: [String] },
  shares: { type: [String] }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
