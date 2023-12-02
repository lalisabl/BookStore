const Book = require("../models/bookModel");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

exports.postBook = async (req, res, next) => {
  upload.single("file")(req, res, async function (err) {
    if (err) {
      return next(new AppError("File upload failed", 500));
    }

    const { title, user, categories } = req.body;
    if (!req.file) {
      //   return res.status(402).json({ error: "bad request: no file selected" });
      return next(new AppError("bad request: no file selected", 400));
    }
    const filename = req.file.filename;

    await Book.create({ title, user, filename, categories });

    res.status(201).json({ message: "Book uploaded successfully" });
  });
};

//update book information
exports.updateBookTitle = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { newTitle, userId /*for demo it need to be updated */ } = req.body;

  //need to be updated
  //   const userId = req.user.id
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }
  if (book.user.toString() !== userId) {
    return next(
      new AppError("Unauthorized: You are not the owner of this book", 403)
    );
  }

  book.title = newTitle;
  await book.save();

  res
    .status(200)
    .json({ message: "Book title updated successfully", updatedBook: book });
});

//delete book and book data from db
const fs = require("fs").promises;
exports.deleteBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { userId /*for demo it needs to be updated */ } = req.body;

  // need to be updated
  // const userId = req.user.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  //add admin access to here
  // by req.user.role===admin
  if (book.user.toString() !== userId) {
    return next(
      new AppError("Unauthorized: You are not the owner of this book", 403)
    );
  }
  const filePath = `uploads/${book.filename}`;

  await Book.findByIdAndDelete(bookId);

  await fs.unlink(filePath);

  res.status(204).json({ message: "Book deleted successfully" });
});

//report on book from any user
exports.reportBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { userId, reportType, moreDetail } = req.body;

  // need to be updated
  // const userId = req.user.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const alreadyReported = book.reports.some(
    (report) => report.user_id.toString() === userId
  );

  if (alreadyReported) {
    return next(new AppError("You have already reported this book", 400));
  }

  book.reports.push({ user_id: userId, reportType, moreDetail });
  await book.save();

  res.status(200).json({ message: "Book reported successfully" });
});




