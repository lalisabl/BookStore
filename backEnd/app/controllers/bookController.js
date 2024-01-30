const Book = require("../models/bookModel");
const Notification = require("../models/notificationModel");
const User = require("../models/UserModel");
const multer = require("multer");
const { fromPath } = require("pdf2pic");
const sharp = require("sharp");
const path = require("path");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const fs = require("fs").promises;

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

const Thumbnail = async (pdfFilePath, filename, outputFolderPath) => {
  console.log(filename);
  const options = {
    density: 100,
    saveFilename: filename,
    savePath: outputFolderPath,
    format: "png",
    width: 100,
    height: 100,
  };

  const convert = fromPath(pdfFilePath, options);
  const pageToConvertAsImage = 1;

  try {
    const result = await convert(pageToConvertAsImage, {
      responseType: "image",
    });

    console.log("Thumbnail extraction successful:", result.name);
    return result[0];
  } catch (error) {
    console.error("Error extracting thumbnail:", error);
    return null;
  }
};

exports.postBook = catchAsync(async (req, res, next) => {
  upload.single("file")(req, res, async function (err) {
    if (err) {
      return next(new AppError("File upload failed", 500));
    }
    const user = req.user.id;
    const { title, category, tags } = req.body;
    if (!req.file) {
      return next(new AppError("bad request: no file selected", 404));
    }
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();

    // Define allowed document extensions
    const allowedDocumentExtensions = [
      "pdf",
      "doc",
      "docx",
      "txt",
      "xls",
      "rtf",
      "odt",
      "csv",
      "ods",
      "xlsx",
      "ppt",
      "pptx",
    ];

    const filename = req.file.filename;
    if (!allowedDocumentExtensions.includes(fileExtension)) {
      const filePath = `uploads/${filename}`;

      await fs.unlink(filePath);
      return next(new AppError("Unsupported file type", 400));
    }

    try {
      await Thumbnail(
        `uploads/${filename.split(".")[0]}`,
        filename,
        "./public/images/thumbnails"
      );
      const thumbnail = filename.split(".")[0];
      console.log(thumbnail);
      await Book.create({ title, user, filename, category, thumbnail });
      res.status(201).json({ message: "Book uploaded successfully" });
    } catch (err) {
      const filePath = `uploads/${filename}`;
      await fs.unlink(filePath);
      return next(new AppError(err.message, 400));
    }
  });
});

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
/* The code is defining a function called `deleteBook` that is responsible for deleting a book from the
database and removing its associated file from the file system. */
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

//Get All product
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  multfilter() {
    const searchQuery = this.queryString.q || "";
    if (typeof searchQuery === "string") {
      const regexSearch = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { categories: { $regex: searchQuery, $options: "i" } },
        ],
      };
      this.query.find(regexSearch);
    }
    return this;
  }
  filter() {
    //1 build query
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields", "q"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // advanced query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-upload_date");
    }
    return this;
  }
  limiting() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginatinating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
// get all Books
exports.getAllBooks = async (req, res) => {
  try {
    //4 excute query
    const features = new APIfeatures(Book.find(), req.query)
      .multfilter()
      .filter()
      .sort()
      .limiting()
      .paginatinating();

    const Books = await features.query.select("-reviews -reports").populate({
      path: "user",
      select:
        "email created_at username profile.picture profile.bio id profile.fullName",
    });

    res.status(200).json({
      status: "success",
      results: Books.length,
      data: {
        Books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// GET EACH book by it's id
/* The code `exports.getEachBook` is defining a function that handles the request to get a specific
book by its ID. */

exports.getEachBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  const book = await Book.findById(id)
    .select("-reports")
    .populate({
      path: "user",
      select: "email created_at username profile.picture profile.bio  fullName",
    })
    .populate({
      path: "reviews.user_id",
      select: "username profile.picture id fullName",
      options: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });

  if (book && book.reviews) {
    book.reviews.sort((a, b) => b.timestamp - a.timestamp);
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

// reaction on books
// API endpoint for setting rating and review
exports.setRate_review = catchAsync(async (req, res, next) => {
  const { bookId, rating, comment } = req.body;
  const user_id = req.user.id;
  if (!bookId || !user_id) {
    return res.status(400).json({ error: "Book ID and user ID are required." });
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found." });
  }

  if (comment !== undefined && rating !== undefined) {
    await book.addReview(user_id, rating, comment);
    await book.addRating(rating);
  }
  // Create a notification for the user who uploaded the book for the review

  if (book && book.user) {
    const notification = await Notification.create({
      message: `${req.user.username} wrote a review for your book.`,
      relatedBook: req.params.bookId,
      sender: req.user.id,
    });
    await User.findByIdAndUpdate(
      book.user,
      { $addToSet: { "profile.notifications": notification._id } },
      { new: true }
    );
  }

  return res
    .status(200)
    .json({ message: "Rating and review set successfully." });
});
// Endpoint to handle download requests
exports.shareBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  await book.addShare();
  return res.status(200).json({ url: book.id, message: "shared successful" });
});

// Endpoint to handle download requests
exports.downloadBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  if (!book.downloadable) {
    return next(new AppError("Download not allowed for this book", 403));
  }
  await book.addDownload();
  return res
    .status(200)
    .json({ url: book.filename, message: "Download successful" });
});

// Endpoint to get file location by book ID
exports.getFileLocation = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Construct the complete file location URL
    //need to be edited
    const fileLocationURL = `http://localhost:5000/${book.filename}`;

    // Return the file location URL
    return res.status(200).json({ fileLocation: fileLocationURL });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
