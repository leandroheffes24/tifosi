const AWS = require('aws-sdk');
require("dotenv").config()

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();

module.exports = s3;

// const { S3Client } = require('@aws-sdk/client-s3');

// const s3 = new S3Client({
//     region: process.env.BUCKET_REGION,
//     credentials: {
//         accessKeyId: process.env.ACCESS_KEY,
//         secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     },
// });

// module.exports = s3