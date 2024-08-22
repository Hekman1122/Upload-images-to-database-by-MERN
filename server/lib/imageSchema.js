const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  uploadTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", imageSchema);
