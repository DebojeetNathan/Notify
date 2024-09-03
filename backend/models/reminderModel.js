const mongoose = require("mongoose");

// Define a schema for the Reminders model
const reminderSchema = new mongoose.Schema({
  medicationName: {
    type: String,
    required: true,
  },
  isReminded: {
    type: Boolean,
    default: false,
  },
  remindhr: {
    type: Number,
    required: true,
  },
  remindmin: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to the User model for associating reminders with users
    required: true,
  },
  email: {
    type: Boolean,
    default: false,
  },
  whatsapp: {
    type: Boolean,
    default: false,
  },
});

// Create a Mongoose model from the schema
const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
