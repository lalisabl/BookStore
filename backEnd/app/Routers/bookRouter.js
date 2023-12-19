const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");

router.post("/upload",authController.protect, bookController.postBook);
router.patch("/updateBookTitle/:bookId", bookController.updateBookTitle);
router.delete("/delete/:bookId", bookController.deleteBook);
router.post("/report/:bookId", bookController.reportBook);
router.get("/get", bookController.getAllBooks);
router.get("/get/:id", bookController.getEachBook);
router.post("/setRate_review",authController.protect, bookController.setRate_review);
router.get("/download/:bookId", bookController.downloadBook);
router.get("/share/:bookId", bookController.shareBook);
router.get("/getLocation/:bookId", bookController.getFileLocation);
module.exports = router;
