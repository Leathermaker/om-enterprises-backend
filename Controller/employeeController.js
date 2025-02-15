import { Employee } from "../models/employee.model.js"

export async function employeeController(req,res) {
    try {
        const {ename,position,phone,email} = req.body
        const employee = new Employee({file:req.file,ename,position,phone,email})
        const result = employee.save()
        res.json({
            msg:`Successfully ${ename} is added as for  position ${position}`
        })
    } catch (error) {
        res.json({
            msg:"Unexpected Error"
        })
    }
}


export async function allEmployees(req,res) {
    try {
        const result = await Employee.find()
        res.json({
            data:result
        })        
    } catch (error) {
        res.json({
            msg:"Unexpected Error"
        })
    }
}
export async function deleteEmployee(req,res) {
    try {
        console.log("delete")
        console.log(req.body)
        const {id} = req.body
        const result = await Employee.findOne({_id:id})
        console.log(result)
        if(result && result !== null){
            console.log("ih")
            const response = await Employee.deleteOne({_id:id})
            res.json({
                data:response
            })        
        }else{
            res.json({
                msg:"This User is not Exist anymore"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg:"Unexpected Error"
        })
    }
}


export async function updateEmployee(req,res) {
    try {
        const {e_id,file,name,position,phone,email} = req.body
        const result = await Employee.find({_id:e_id})
        if(result){
            const response = await Employee.updateOne({
                _id:e_id
            },{
                $set : {
                    file,
                    name,
                    position,
                    phone,
                    email
                }
            })
        }
    } catch (error) {
        res.json({
            msg:"Unexpected Error"
        })
    }
}