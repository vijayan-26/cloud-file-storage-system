const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },

  originalname: {
    type: String,
    required: true
  },

  fileurl: {
    type: String,
    required: true
  },

  uploadedBy: {
    type: String,
    required: true
  },

  version: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("File", fileSchema);