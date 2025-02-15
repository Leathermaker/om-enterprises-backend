import mongoose from "mongoose";


const employeeSchema = mongoose.Schema({
    file:String,
    ename:String,
    position:String,
    phone:String,
    email:{
        type:String,
        required:true
    }
})

export const Employee = mongoose.model("employees",employeeSchema)