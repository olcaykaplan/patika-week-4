import 'dotenv/config';
export const url_local = 'http://localhost:3000/';


interface DB_OPTIONS {
  host: string;
  user: string;
  database: string;
  password: string;
}
export const options_local : DB_OPTIONS  = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    database: process.env.DB_NAME || '',
    password: process.env.DB_PASSWORD || '',
}