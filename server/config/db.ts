import mysql from 'mysql2';
import { options_local } from './conf';
const pool = mysql.createPool(options_local);

export default pool.promise();
