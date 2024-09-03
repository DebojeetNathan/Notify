const schedule = require("node-schedule");
const ErrorHander = require("../utils/errorhander");
const Reminder = require("../models/reminderModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel"); // Import your User model
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const sendWhatsapp = require("../utils/sendWhatsapp");

eventEmitter.on("reminderCreated", async (reminder) => {
  try {
    // Schedule email notifications for the new reminder
    await scheduleEmailNotificationsController(reminder);
    await scheduleWhatsappNotificationsController(reminder);
  } catch (error) {
    console.error("Error scheduling email notifications:", error);
  }
});

exports.createReminder = async (req, res) => {
  try {
    // Get reminder details from the request body
    const {
      medicationName,
      remindhr,
      remindmin,
      description,
      email,
      whatsapp,
      sms,
      call,
    } = req.body;

    // Create a new reminder document
    const newReminder = await Reminder.create({
      medicationName,
      remindhr,
      remindmin,
      description,
      userId: req.user._id, // Assuming you have the user's ID from the request
      email,
      whatsapp,
      sms,
      call,
    });

    res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      reminder: newReminder,
    });
    eventEmitter.emit("reminderCreated", newReminder);
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({
      success: false,
      message: "Error creating reminder",
    });
  }
};
exports.reminderlist = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const Reminderlist = await Reminder.find({
      userId: userId,
    });

    res.status(200).json({
      success: true,
      Reminderlist,
      userId,
    });
  } catch (error) {
    next(error);
  }
};
exports.deletereminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) return next(new ErrorHander("Task not found", 404));
    await reminder.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Function to send email notifications
const sendEmailNotifications = async (reminder) => {
  try {
    // Get user details associated with the reminder
    const user = await User.findById(reminder.userId);

    if (!user) {
      // Handle the case where the user associated with the reminder is not found
      return;
    }

    const message = `Hello ${user.name},\n\nIt's your time for your reminder: ${reminder.medicationName}.`;

    // Send the email using the sendEmail function
    await sendEmail({
      email: user.email,
      subject: "Reminder",
      message,
    });

    // Optionally, update the reminder as "reminded" if needed
    reminder.isReminded = true;
    await reminder.save();
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

const scheduleEmailNotificationsController = async () => {
  try {
    // Retrieve reminders that need email notifications
    const reminders = await Reminder.find({
      email: true, // Filter for reminders with email notifications enabled
      isReminded: false, // Filter for reminders that have not been reminded yet
    });

    // Schedule email notifications for each reminder
    for (const reminder of reminders) {
      const { remindhr, remindmin } = reminder;
      // Schedule the job
      schedule.scheduleJob(`${remindmin} ${remindhr} * * *`, async () => {
        await sendEmailNotifications(reminder);
      });
    }
  } catch (error) {
    console.error("Error scheduling email notifications:", error);
  }
};

exports.scheduleEmailNotificationsController =
  scheduleEmailNotificationsController;

const sendWhatsappNotifications = async (reminder) => {
  try {
    // Get user details associated with the reminder
    const user = await User.findById(reminder.userId);

    if (!user) {
      // Handle the case where the user associated with the reminder is not found
      return;
    }

    const message = `Hello ${user.name},\n\nIt's time for your reminder: ${reminder.medicationName}.`;

    // Send the email using the sendEmail function
    await sendWhatsapp({
      number: user.number,
      message,
    });

    // Optionally, update the reminder as "reminded" if needed
    reminder.isReminded = true;
    await reminder.save();
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

const scheduleWhatsappNotificationsController = async () => {
  try {
    // Retrieve reminders that need email notifications
    const reminders = await Reminder.find({
      whatsapp: true, // Filter for reminders with email notifications enabled
      isReminded: false, // Filter for reminders that have not been reminded yet
    });

    // Schedule email notifications for each reminder
    for (const reminder of reminders) {
      const { remindhr, remindmin } = reminder;
      // Schedule the job
      schedule.scheduleJob(`${remindmin} ${remindhr} * * *`, async () => {
        await sendWhatsappNotifications(reminder);
      });
    }
  } catch (error) {
    console.error("Error scheduling email notifications:", error);
  }
};
