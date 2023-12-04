const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const authController = require("../controllers/authController");
router.post("/favorites/:bookId", favoritesController.addToFavorites);

router.get("/favorites", favoritesController.getFavorites);
router.delete("/favorites/:bookId", favoritesController.removeFromFavorites);

module.exports = router;
