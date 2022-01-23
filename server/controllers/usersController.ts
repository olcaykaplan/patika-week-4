import { Request, Response } from "express";
import User from '../models/User';

export const getUsers = async (req:Request, res:Response) => {
    try {
      let users = await User.findAll();
      console.log("users",users[0])
      res.status(200).send({error:false, userList:users[0]});
    } catch (error) {}
};