import { error } from "console"
import mongoose from "mongoose"

export const connectDb = ()=>{
    mongoose.connect("mongodb://localhost:27017", {
        dbName:"Tasker"
    }).then(()=>{
        console.log("Connected to DB")
    })

}