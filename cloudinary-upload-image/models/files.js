const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  cloudinary_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', fileSchema);
