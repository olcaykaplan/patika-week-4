const mysql = require('mysql2');
const { options_local } = require('../config/conf');
const pool = mysql.createPool(options_local);

module.exports = pool.promise();
