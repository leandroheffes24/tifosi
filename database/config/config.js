const mysql = require("mysql2")

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection((err, conn) => {
  if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = pool.promise()

// require('dotenv').config();

// module.exports = {
//   "development": {
//     "username": "root" || process.env.DB_USERNAME_DEV,
//     "password": "" || process.env.DB_PASSWORD_DEV,
//     "database": "futbolecommerce" || process.env.DB_NAME_DEV,
//     "host": "127.0.0.1" || process.env.DB_HOST_DEV,
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root" || process.env.DB_USERNAME_DEV,
//     "password": "" || process.env.DB_PASSWORD_DEV,
//     "database": "futbolecommerce" || process.env.DB_NAME_DEV,
//     "host": "127.0.0.1" || process.env.DB_HOST_DEV,
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root" || process.env.DB_USERNAME_DEV,
//     "password": "" || process.env.DB_PASSWORD_DEV,
//     "database": "futbolecommerce" || process.env.DB_NAME_DEV,
//     "host": "127.0.0.1" || process.env.DB_HOST_DEV,
//     "dialect": "mysql"
//   }
// }