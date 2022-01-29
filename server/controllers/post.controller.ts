import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/post.entity";
import { PostRegisterValidation } from "../validation/post-register.validation";
export const CreatePost = async (req: Request, res: Response) => {
  try {
    console.log("middleware geçti");
    const user = req["user"];

    const { error } = PostRegisterValidation.validate(req.body);
    if (error) {
      console.log("error basıyor", error);
      return res.status(400).send(error.details);
    }

    const post = await Post.save({ ...req.body, user });
    
    res.send({ error: false, message: "Post created successfully." });
  } catch (error) {
    console.log("CreatePost| error: ", error);
  }
};

export const DeletePost = async (req: Request, res: Response) => {
  try {
    const post = req["post"]
    const deletePost = await Post.delete(post.id);
    console.log("deletePost: ", deletePost);
    res.status(204).send({ error: false, message: "Post deleted successfully." });
  } catch (error) {
    console.log("DeletePost | error: ", error);
  }
};

export const UpdatePost= async (req: Request, res: Response) => {
  try {
      const post = req["post"]      
      
      const updatedPost = await Post.update(post.id, {
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
      const post = await Post.findOne(postID)
      const featuredPosts = await getFeaturedPosts(2);
      console.log("featuredPosts",featuredPosts)
     res.send({post, featuredPosts});
  } catch (error) {
      
  }
}

// return all posts of the user
export const GetPostsByUserID = async (req: Request, res: Response) => {
  try {
    console.log("GetPostsByUserID",GetPostsByUserID)
      const userID = req.params.id;
      console.log("userID",userID)
      const data = await Post.find({relations: ['user'], where: {user: {id:userID}, isActive:true}})
      const userPosts = postAndUser(data)
     res.send({userPosts});
  } catch (error) {
      
  }
}
// Get All post which are active, and also return author of posts
export const GetAllPosts = async (req: Request, res: Response) => { 
  try {
      const allPosts = await Post.find({relations:["user"], where:{isActive:true} ,order:{createdAt: 'DESC'}});
      const filteredData = postAndUser(allPosts);
      res.send(filteredData);
  } catch (error) {
      
  }
}

// Get Last Created Posts by limit
const getFeaturedPosts = async  (limit:number) => { 
  try {
    const posts = await Post.find({relations:["user"], take:limit, where:{isActive:true}, order:{createdAt: 'DESC'}})
    const featuredPost = postAndUser(posts);
    return featuredPost;
  } catch (error) {
    
  }
}

// it helps to edit data object 
const postAndUser = (postArray) => {
  const data = postArray.map(post => {
    const {user, ...postData} = post;
    return {...postData, author: {fullName:user.fullName, id:user.id}}
  })
  return data;
}
