import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    required: [true, "Title is Required"],
    type: String,
  },
  description: {
    required: [true, "Description is Required"],
    type: String,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Author is Required"],
    ref: "User",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Author is Required"],
    ref: "User",
  },
  status:{
    type:String,
    enum: ["Pending", "In Progress", "Completed"],
    default:"Pending"
  },

  dueDate: {
    type: String,
    required: [true, "Due Date is Required"],
  },
  dueTime: {
    type: String,
    required: [true, "Due Date is Required"],
  }
},
{
  timestamps: true,
}
);
export const Task = mongoose.model("Task", schema);
