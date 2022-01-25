import bcrypt from "bcrypt";
import {verify, sign} from "jsonwebtoken";

const TWO_HOURS = 1000 * 60 * 60 * 2;

export const passportHashed = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
export  const createJWT = (data: any) => {
    const token = sign(data, process.env.JWT_SECRET, {
      expiresIn: TWO_HOURS,
    });
    return token;
  };
  
export const comparePassword = async (password: string, passwordDB: string) => {
   return await bcrypt.compare(
        password,
        passwordDB
      );  
}