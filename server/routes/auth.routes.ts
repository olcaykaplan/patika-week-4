import express, { Request, Response } from "express";
import { CreateUser, Logout, Login, AuthenticatedUser } from "../controllers/auth.controller";
import {checkUserAuth} from '../middleware/auth.middleware';
const router = express.Router();
router.get("/api/logout", Logout);
router.post("/api/signin", Login);
router.post("/api/signup", CreateUser);
router.get("/api/user-auth", checkUserAuth, AuthenticatedUser);
export = router;
