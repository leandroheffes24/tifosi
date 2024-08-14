const config = {
  development: {
    username: "ufr4gavzrvxw8zof"||process.env.DB_USERNAME,
    password: "q7GNZvKE3bSkXVYJh0U0"||process.env.DB_PASSWORD,
    database: "bn9jf2z15aw370ldurof"||process.env.DB_DBNAME,
    host: "bn9jf2z15aw370ldurof-mysql.services.clever-cloud.com"||process.env.DB_HOST,
    dialect: "mysql"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql"
  }
};

module.exports = config;



// const mysql = require("mysql2")

// const pool = mysql.createPool({
//   host: "bn9jf2z15aw370ldurof-mysql.services.clever-cloud.com"||process.env.DB_HOST,
//   user: "ufr4gavzrvxw8zof"||process.env.DB_USERNAME,
//   password: "q7GNZvKE3bSkXVYJh0U0"||process.env.DB_PASSWORD,
//   database: "bn9jf2z15aw370ldurof"||process.env.DB_DBNAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })

// pool.getConnection((err, conn) => {
//   if(err) console.log(err)
//     console.log("Connected successfully")
// })

// module.exports = pool.promise()



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