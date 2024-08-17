const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIA3RYC6HY2P7RTWOLG"||process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: "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"||process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2"||process.env.AWS_REGION,
});

const s3 = new AWS.S3();

module.exports = s3;