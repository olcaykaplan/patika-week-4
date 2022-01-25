import { Request, Response } from "express";
//import bcrypt from "bcrypt";
//import { sign } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import { RegisterValidation } from "../validation/register.validation";
import { passportHashed ,createJWT, comparePassword } from "../utils/helper";
import 'dotenv/config';
const TWO_HOURS = 1000 * 60 * 60 * 2;


export const AuthenticatedUser = async (req: Request, res: Response) => {
        res.send({user: req["user"].fullName}); 
}

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const { error } = RegisterValidation.validate(body);
    // if: validation error exist for register body
    if (error) {
        console.log("error validations")
     return  res.status(400).send(error.details);
    }

      // if : body password & confirmPassword doesn't match
      if (body.password !== body.confirmPassword) {
       return res.status(400).send({
          error: true,
          message: "Password doesn't match with password confirm field!",
        });
      }
      const repository = getManager().getRepository(User);

      const isEmailExist = await repository.findOne({ email: req.body.email });
      // if: body.email already exist in db.
      if (isEmailExist) {
       return res.status(400).send({ error: true, message: "The email is already exist!" });
      }

      // create user
      const hashedPassword = await passportHashed(body.password);
      const { password, ...user } = await repository.save({
        ...body,
        password: hashedPassword,
      });

      //jwt token create
      const token = createJWT({
        fullName: user.fullName,
        userID: user.id,
        email: user.email,
        userAgent: req.headers["user-agent"],
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: TWO_HOURS,
      });

      res.send({ user: user.fullName });
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "error, user not created" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    // find user with the email and if its exist compare password
    // if everything is okay let the user login
    const { email, password } = req.body;
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ email });
    console.log("user", user);
    if (user) {
      // CHECK user's hashed password and passing password are matched
      const isMatchedHashedPassword = await comparePassword(password,user.password);
      // if: Email exist and password match
      if (isMatchedHashedPassword) {
        const token = createJWT({
          fullName: user.fullName,
          userID: user.id,
          email: user.email,
          userAgent: req.headers["user-agent"]
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: TWO_HOURS });
        res.status(201).send({ error: false, user: user.fullName });
      }
      // else : Password doesn't match with matched user's password
      else {
        res.send({
          error: true,
          message:
            "Email or Password is wrong, please check your credentials. ",
        });
      }
    }
    // else : Email not exist
    else {
      res.send({
        error: true,
        message: "Email or Password is wrong, please check your credentials.",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ error: true, message: "error, user not find" });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 15 });
    res.status(200).send({ error: false });
  } catch (error) {}
};
