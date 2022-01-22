import { Request, Response } from "express";

import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const TWO_HOURS = 1000 * 60 * 60 * 2;

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 15 });
    req.session.destroy(function(){})
    res.status(200).send({ error: false });
  } catch (error) {}
};

export const login = async (req: Request, res: Response) => {
  // find user with the email and if its exist compare password
  // if everything is okay let the user login
  try {
    const { email, password } = req.body;
    console.log("login ekranına girildi");
    const userModal = new User();
    const user = await userModal.findUserByEmail(email);
    console.log("user",user[0])
    await userModal.findUserByID(user[0].id)
    if (user.length > 0) {
      // CHECK user's hashed password and passing password are matched
      const isMatchedHashedPassword = await bcrypt.compare(
        password,
        user[0].password
      );
      if (isMatchedHashedPassword) {
        const token = createJWT({
          fullName: user[0].fullName,
          userID: user[0].id, // 3
          userAgent: req.headers["user-agent"], // google-chrome
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: TWO_HOURS }); // multiply 1000 to convert to second to millisecond
        // set sessions
        req.session.userID = user[0].id;
        req.session.userAgent = req.headers["user-agent"] as string;
        res.status(201).send({ error: false, user: user[0].fullName });
      } else {
        res.send({
          error: true,
          message:
            "Email or Password is wrong, please check your credentials. ",
        });
      }
    } else {
      res.send({
        error: true,
        message: "Email or Password is wrong, please check your credentials.",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    console.log();

    res.send({ error: true, message: "error, Oops! Something went wrong." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    if (fullName && email && password && confirmPassword) {
      const hashedPassword = await passportHashed(password);
      const user = new User(fullName, email, hashedPassword);
      let isEmailExist = await user.findUserByEmail(email);
      if (isEmailExist.length <= 0) {
        if (password === confirmPassword) {
          // create jwt here || data will contains user ıd, browser info and local info
          // multiply 1000 to convert to second to millisecond
          let userCreated = await user.save();
          req.session.userID = userCreated[0].insertId;
          req.session.userAgent = req.headers["user-agent"] as string;
          const token = createJWT({
            fullName: userCreated[0].fullName,
            userID: userCreated[0].insertId,
            userAgent: req.headers["user-agent"],
          });
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: TWO_HOURS,
          });
          res.status(201).send({ user: userCreated[0].insertId });
        } else {
          res.send({
            error: true,
            message: "Password doesn't match with password confirm field!",
          });
        }
      } else {
        res.send({ error: true, message: "The email is already exist!" });
      }
    } else
      res.send({ error: true, message: "Required fields can't be empty!" });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "error, user not created" });
  }
};

const passportHashed = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createJWT = (data: any) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: TWO_HOURS,
  });
  return token;
};
