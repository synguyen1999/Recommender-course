const mongoose = require("mongoose");

const Scores = new mongoose.Schema({
  StudedntId: {
    type: Number,
    required: true,
  },
  CourseId: {
    type: Number,
    required: true,
  },
  Score: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Scores", Scores);
