const mongoose = require("mongoose");

const Material = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,

  }
}, { timestamps: true });

module.exports = mongoose.model("Material", Material);
