import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import { passportHashed } from "../utils/helper";

export const Users = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User)
        const users = await repository.find();
        const usersResponse = users.map(user => {
            const {password, ...data} = user
            return data;
        })
        console.log("usersResponse: ",usersResponse)
        res.send(usersResponse);
    } catch (error) {
        
    }
}

export const ChangePassword = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);
        const hashedPassword = await passportHashed(req.body.password);
        const passwordUpdate = await repository.update(req["user"].id, {
            password: hashedPassword
        })
        console.log("passwordUpdate",passwordUpdate)
        res.send({passwordUpdate})
    } catch (error) {
        
    }
}

export const UpdateInformation = async (req: Request, res: Response) => {
try {
    const repository = getManager().getRepository(User);
    const userUpdate = await repository.update(req["user"].id, {
        ...req.body
    })
    console.log("userUpdate",userUpdate)
    res.send({userUpdate})
} catch (error) {
    
}
}

