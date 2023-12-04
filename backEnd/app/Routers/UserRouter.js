const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.post("/register", authController.createNewAccount);
router.post("/login", authController.loginUsers);
router.get("/logout", authController.logoutUser);
router.route("/").get(userController.getAllUsers);
router
  .route("/me")
  .get(authController.protect, userController.getMe, userController.getOneUser);
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router
  .route("/:userId")
  .get(userController.getOneUser)
  .delete(userController.deleteUser);
module.exports = router;
