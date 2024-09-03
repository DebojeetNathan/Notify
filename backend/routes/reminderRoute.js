const express = require("express");
const {
  deletereminder,
  reminderlist,
  createReminder,
  scheduleEmailNotificationsController,
} = require("../controllers/reminderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create").post(isAuthenticatedUser, createReminder);

router.route("/delete/:id").delete(isAuthenticatedUser, deletereminder);
router
  .route("/schedule")
  .post(isAuthenticatedUser, scheduleEmailNotificationsController);

router.route("/getAllReminder").get(isAuthenticatedUser, reminderlist);

module.exports = router;
