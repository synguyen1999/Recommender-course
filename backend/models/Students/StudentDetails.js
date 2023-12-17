const mongoose = require("mongoose");

const studentDetails = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  admissionYear: {
    type: Number,
  },
  gender: {
    type: String,
    // required: true,
  },
  profile: {
    type: String,
    // required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Student Detail", studentDetails);