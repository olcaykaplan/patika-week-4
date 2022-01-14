const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt; // 123hbn12 jgub1n2m3 u12g3u1h2jb31
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
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

/*
login et 
kullanıcı yarat
yukarıdaki işlemler başarılı olursa home page gönder ve menüleri düzenle
logout işlemini yaptır,
başarılı olmazsa login sayfasına gönder ancak error bas

başarılı login olursa kullanıcıları listele

vaktin kalırsa blog gireceği sayfayı oluştur, db oluşturmayı unutma
kaydettir,

*/