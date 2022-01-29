import {Request, Response, NextFunction} from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/post.entity";

// control if post is not exist and post is not belong to the user who made request
// if everything okey, take the post to use into the next function 
export const checkPostUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.id; 
        const repository = getManager().getRepository(Post);
    
        const post = await repository.findOne(postID, {relations: ['user']} );
        console.log("postID",postID)
        console.log("post",post)
        if (!post) {
          return res.status(400).send({ error: true, message: "Post couldn't find." });
        }
        // control: relational post's user id and user id who made request
        // req["user"] this value come from checkUserAuth middleware
        if (post.user.id !== req["user"].id) {
          return res.status(401).send({ error: true, message: "Unauthorized!" });
        }      

        req["post"] = post;
        next();
    } catch (error) {
        console.log("checkPostUser | error",error)
    }
}