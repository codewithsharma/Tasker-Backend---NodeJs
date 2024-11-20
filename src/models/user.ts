import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "../types/types";




const schema = new mongoose.Schema(
    {
        id: mongoose.Types.ObjectId,
        name: {
            type:String,
            required: [true, "Name is required"],
        },
        email: {
            unique: true,
            type: String,
            required: [true, "Email is required"],
            validator: validator.default.isEmail
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"

        },
        image: {
            type: String,
            default: "img.png"
        },
     
    },
    {
        timestamps: true,
    }
);

export const user = mongoose.model<IUser>("User", schema);
