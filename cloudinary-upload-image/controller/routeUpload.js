const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const File = require('../models/files'); // Import the File model

router.post('/upload', upload.single('image'), async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new file record in MongoDB
    const file = new File({
      url: result.secure_url,
      cloudinary_id: result.public_id
    });

    await file.save();

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: file
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    });
  }
});


router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching images" });
  }
});

module.exports = router;
