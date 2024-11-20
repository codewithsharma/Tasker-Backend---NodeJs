import express from "express"
import { createTask, deleteTask, getAllTask, getTaskDetail } from "../controllers/task"
const app = express.Router()
app.post("/create",  createTask)
app.get("/",  getAllTask)
app.delete("/:id",  deleteTask)
app.use("/:id",  getTaskDetail)


export default app