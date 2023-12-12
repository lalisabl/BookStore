const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");


// authController.CreateGoogleStrategy();
router.use(passport.initialize());
router.post("/register", authController.createNewAccount);
router.get("/check-availabilty", userController.signupValidation);
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
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.googleSignInRedirect
);

module.exports = router;
