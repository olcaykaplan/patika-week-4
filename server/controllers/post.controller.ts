import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/post.entity";
import { PostRegisterValidation } from "../validation/post-register.validation";

export const CreatePost = async (req: Request, res: Response) => {
  try {
    console.log("middleware geçti");
    const user = req["user"];
    const repository = getManager().getRepository(Post);

    const { error } = PostRegisterValidation.validate(req.body);
    if (error) {
      console.log("error basıyor", error);
      return res.status(400).send(error.details);
    }

    const post = await repository.save({ ...req.body, user });
    console.log("post", post);
    res.send({ post });
  } catch (error) {
    console.log("CreatePost| error: ", error);
  }
};

export const DeletePost = async (req: Request, res: Response) => {
  try {
    const post = req["post"]
    const repository = getManager().getRepository(Post);
    const deletePost = await repository.delete(post.id);
    console.log("deletePost: ", deletePost);
    res.status(204).send({ error: false, message: "Post deleted successfully." });
  } catch (error) {
    console.log("DeletePost | error: ", error);
  }
};

export const UpdatePost= async (req: Request, res: Response) => {
  try {
      const post = req["post"]      
      const repository = getManager().getRepository(Post);
      
      const updatedPost = await repository.update(post.id, {
         ...req.body
      })

      res.status(202).send("The post updated successfully.");
  } catch (error) {
    console.log("UpdatePost | error: ", error);
  }
};


export const GetPostsByID = async (req: Request, res: Response) => {
    try {
        const postID = req.params.id;
        const repository = getManager().getRepository(Post);        
        const post = await repository.findOne(postID)
       res.send(post);
    } catch (error) {
        
    }
}
export const GetAllPosts = async (req: Request, res: Response) => { 
    try {
        const repository = getManager().getRepository(Post);

        const allPosts = await repository.find();
        console.log("allPosts",allPosts)
        res.send(allPosts);
    } catch (error) {
        
    }
}