import express  from "express";
import userRoute from "./user"
import taskRoute from "./task"
const app = express.Router();
app.use("/users",userRoute )
app.use("/tasks",taskRoute )
app.use("/admin",taskRoute )
export default app; 