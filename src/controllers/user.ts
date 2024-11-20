import { NextFunction, Request, RequestHandler, Response } from "express";
import { user } from "../models/user";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { Task } from "../models/task";
export const registerUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, image, name, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const isUser = await user.findOne({email})
    console.log(isUser)
    if (!isUser) {
      const User = await user.create({
        name,
        email,
        password: hashedPassword,
        image,
        role,
      });
      const token = Jwt.sign({ id: User.id }, "SecretKey");
      res.cookie(token, "token", {
        httpOnly:true
      });
      return res.json({ "message": `Welcome ${User.name} `, "token":token , type:"success", name :User.name, role:User.role, email:User.email,userId :User._id });

    }
    else{

      return res.json({
        message: "User Already Exist",
        type:"error"
      })
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
export const getUserDetail: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const User = await user.findById(id);
    if(!User){
      return res.json({message:"User Not Found",type:"error"})
    }
    res.send(User);
  } catch (err) {
    console.log(err);
  }
};

export const getUserDetailWithTasks: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const User = await user.findById(id);

    if(!User){
      return res.json({message:"User Not Found",type:"error"})
    }
    const Tasks = await (await Task.find({"assignedTo":User._id})).reverse()
    res.json({userDetail: User, task:Tasks});
  } catch (err) {
    console.log(err);
  }
};
export const getAllUsers: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let users = await user.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};
export const getAllUsersOnly: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let users = await user.find({role:"user"});
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};
 
export const deleteUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const User = await user.findByIdAndDelete(id);

    if (!User) {
     res.json({
      "message":"Wrong Credentials",
      "status": "error"
     })
    }
    res.json({
      message: ` ${User?.name}, Deleted Successfully`,
    });
  } catch (err) {
    console.log(err);
  }
};
export const LoginUser: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const User: any = await user.findOne({ email });
  if (User) {
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.json({"message":"Wrong Credientials", type:"error", status:400})
    }
    const token = Jwt.sign({ id: User.id }, "SecretKey");
    return res.json({ "message": `Welcome ${User.name} `, "token":token , type:"success", name :User.name, role:User.role, email:User.email,userId :User._id });
  } else {
    console.log("User not");
     res.json({
      "message":"Wrong Credentials",
      "type": "error"
     })
  }
};

export const LogoutUser: any = async (req: any, res: any) => {
  res.clearCookie("token");
};
