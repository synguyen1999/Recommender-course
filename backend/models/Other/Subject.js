const mongoose = require("mongoose");

const Subject = new mongoose.Schema({
  CourseId: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  College: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Introduction: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Subject", Subject);
