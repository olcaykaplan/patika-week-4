import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const checkUser = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decodedToken) => {
      if (err) {
        console.log('err: ', err);
        res.status(401).send({ error: true, message: 'You must login first!' });
      } else if (decodedToken.userID) {   
       // check the user request browser does match with  your session browser data and jwt browser data
        if ( decodedToken.userAgent === req.headers['user-agent'] && req.session.userAgent === req.headers['user-agent']) {
          res.locals.fullName = decodedToken.fullName
          next();
        } else {
          res.status(401).send({ error: true, message: 'You made this request on a different browser.' })};
      }
      //res.render('home.jade', {error: 'denied'}); example
      else  res.status(401).send({ error: true, message: 'You must login first!' });

    });
  } else {
    res.status(401).send({ error: true, message: 'You must login first!' });
  }
};
