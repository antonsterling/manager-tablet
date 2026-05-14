const Firebird = require('node-firebird')
require('dotenv').config()

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_PATH,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
}

module.exports = options