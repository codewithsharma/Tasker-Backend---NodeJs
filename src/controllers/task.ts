import { NextFunction, Request, RequestHandler, Response } from "express";
import { Task } from "../models/task";
import { user } from "../models/user";

export const createTask: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, assignedTo, assignedBy, dueDate, dueTime } = req.body;

    const task = await Task.create({
    title, description, assignedTo, assignedBy, dueDate, dueTime
    });
console.log("Task Created,", task)
   res.json({message:"Task created successfully", type:"success", data:task});
  } catch (error) {
    console.error("Error in Createing Task", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};
export const getTaskDetail:any = async (
  req:Request, res:Response, next:NextFunction )=>{
    try{
       const id = req.params.id;
       const task = await Task.findById(id);
       res.send(task);
    }
    catch(err){
      console.log(err)
    }

  }
  export const getAllTask :any = async(
    req:Request, res:Response, next:NextFunction )=>{
      try{
        let task:any = await Task.find().populate("assignedBy").populate("assignedTo")
        
        res.json({ "task":task })
      }
      catch(err){
        console.log(err)
      }
    }
    export const deleteTask :any = async(
      req:Request, res:Response, next:NextFunction )=>{

        try{
          const id = req.params.id
const task = await Task.findByIdAndDelete(id)

if(!task){
  res.send("User Not Found")
}
res.json({
  "message" :` ${task?.title}, Deleted Successfully`,

})

        }
        catch(err){
          console.log(err)
        }
      }

  
