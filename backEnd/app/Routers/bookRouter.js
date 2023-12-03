const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.post("/upload", bookController.postBook);
router.patch("/updateBookTitle/:bookId", bookController.updateBookTitle);
router.delete("/delete/:bookId", bookController.deleteBook);
router.post("/report/:bookId", bookController.reportBook);
router.get("/get", bookController.getAllBooks);

module.exports = router;
