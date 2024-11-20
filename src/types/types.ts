
export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    role: "admin"| "user",
   image:string
}
export interface InewUserRequestBody {
    name:string,
    email:string,
    password:string,
    role: "admin"| "user",
    image:string
}
