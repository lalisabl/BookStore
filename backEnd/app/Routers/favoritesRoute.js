const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const authController = require("../controllers/authController");
router.use(authController.protect);
router.post("/:bookId", favoritesController.addToFavorites);

router.get("/", favoritesController.getFavorites);
router.delete("/:bookId", favoritesController.removeFromFavorites);

module.exports = router;
