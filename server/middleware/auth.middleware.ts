import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import "dotenv/config";

export const checkUserAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    const payloadOfJWT: any = verify(token, process.env.JWT_SECRET);
    if (!payloadOfJWT) {
      return res.status(401).send({ error: true, message: "You must login first!" });
    }
    if (!(payloadOfJWT.userAgent === req.headers["user-agent"])){
      return res.status(401).send({ error: true, message: "You made this request on a different browser." });
    }
    
    const repository = getManager().getRepository(User);
    // get the user from db, declare into req["user"] to use for the next function
    req["user"] = await repository.findOne({email:payloadOfJWT.email})
    next();
  } else {
    res.status(401).send({ error: true, message: "You must login first!" });
  }
};
