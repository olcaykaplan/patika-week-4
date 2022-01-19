
const express = require('express'); // Request, Response, NextFunction
const router = express.Router()
const api = require('./routes/index')
require('dotenv').config();
const app = express(); // Express type
const cors = require('cors')
const conf = require('./config/conf')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var mysql2 = require('mysql2/promise');
const { options_local } = require('./config/conf');


//Middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

const TWO_HOURS = 1000 * 60 * 60 * 2;
var connection = mysql2.createPool(options_local);
var sessionStore = new MySQLStore({}, connection);

app.use(session({
	key: 'sessionCookie',
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: TWO_HOURS
    }
}));

app.use(api)

const PORT: Number = parseInt(process.env.PORT as string) || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))