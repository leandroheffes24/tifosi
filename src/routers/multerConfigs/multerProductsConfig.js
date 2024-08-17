const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../configs/awsConfig');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, // El nombre de tu bucket
    acl: 'public-read', // Opcional: Puedes configurarlo para que sea privado si es necesario
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;

// const multer = require("multer")
// const path = require("path")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../../../public/images/products"))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage})

// module.exports = upload