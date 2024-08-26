const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../configs/awsConfig');
require("dotenv").config()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'private',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;