const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notifcationController");
const authController = require("../controllers/authController");
router.use(authController.protect);
router.get("/notifications", notificationsController.getNotifications);
router.post("/notifications", notificationsController.createNotification);

module.exports = router;
