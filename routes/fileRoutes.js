const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const {
  uploadFile,
  getFiles,
  shareFile
} = require("../controllers/fileController");

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  })
});

router.post("/upload", upload.single("file"), uploadFile);

router.get("/all", getFiles);

router.get("/share/:id", shareFile);

router.get("/", (req, res) => {
  res.send("File Routes Working");
});

module.exports = router;