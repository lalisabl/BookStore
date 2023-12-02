const Book = require('../models/bookModel')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage })

exports.postBook = async (req, res) => {
  try {
    upload.single('file')(req, res, async function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'File upload failed' })
      }

      const { title, author, user } = req.body
      const filename = req.file.filename

      const book = new Book({ title, author, user, filename })
      await book.save()

      res.status(201).json({ message: 'Book uploaded successfully' })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
