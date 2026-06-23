const File = require("../models/File");

const uploadFile = async (req, res) => {
  try {

    let version = 1;

    const existingFiles = await File.find({
      originalname: req.file.originalname
    }).sort({ version: -1 });

    if (existingFiles.length > 0) {
      version = existingFiles[0].version + 1;
    }

    const newFile = new File({
      filename: req.file.key,
      originalname: req.file.originalname,
      fileurl: req.file.location,
      uploadedBy: "Admin",
      version: version
    });

    await newFile.save();

    res.status(201).json({
      message: "File Uploaded Successfully",
      version: version,
      file: newFile
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const getFiles = async (req, res) => {
  try {

    const files = await File.find().sort({
      createdAt: -1
    });

    res.json(files);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const shareFile = async (req, res) => {
  try {

    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File Not Found"
      });
    }

    res.redirect(file.fileurl);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  uploadFile,
  getFiles,
  shareFile
};