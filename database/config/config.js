require('dotenv').config();

module.exports = {
  "development": {
    "username": "root" || process.env.DB_USERNAME_DEV,
    "password": "" || process.env.DB_PASSWORD_DEV,
    "database": "futbolecommerce" || process.env.DB_NAME_DEV,
    "host": "127.0.0.1" || process.env.DB_HOST_DEV,
    "dialect": "mysql"
  },
  "test": {
    "username": "root" || process.env.DB_USERNAME_DEV,
    "password": "" || process.env.DB_PASSWORD_DEV,
    "database": "futbolecommerce" || process.env.DB_NAME_DEV,
    "host": "127.0.0.1" || process.env.DB_HOST_DEV,
    "dialect": "mysql"
  },
  "production": {
    "username": "root" || process.env.DB_USERNAME_DEV,
    "password": "" || process.env.DB_PASSWORD_DEV,
    "database": "futbolecommerce" || process.env.DB_NAME_DEV,
    "host": "127.0.0.1" || process.env.DB_HOST_DEV,
    "dialect": "mysql"
  }
}