import express from 'express';
import api from './routes/index';
import cors from 'cors';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressMySqlSession from "express-mysql-session";
const MySQLStore   = expressMySqlSession(session);

import mysql2 from 'mysql2/promise';

import { options_local } from './config/conf';

const app = express(); // Express type

//Middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

const TWO_HOURS = 1000 * 60 * 60 * 2;
var connection = mysql2.createPool(options_local);
var sessionStore = new MySQLStore({} , connection);

app.use(session({
	key: 'sessionCookie',
	secret: process.env.SESSION_SECRET as string,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: TWO_HOURS
    }
}));

app.use(api)

const PORT: Number = Number(process.env.PORT as string) || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))