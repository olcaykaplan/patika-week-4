exports.url_local = 'http://localhost:3000/';
require('dotenv').config();

exports.options_local = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  }