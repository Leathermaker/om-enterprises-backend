import { companyClient } from "../models/companyClientModel.js"



export async function  companyClientController(req,res){
    console.log(req.body)
    console.log(req.file)
    const {companyName,rating,comment} = req.body

    try {
        const company = new companyClient({file:req.file,companyName,rating,comment})
        const result = await company.save()
        res.json({
            msg:"Saved successfully"
        })
    } catch (error) {
        res.json({
            msg:"Unexpected Error"
        })
    }

}

export async function  companyClientGetController(req,res) {

    try {
        const result = await companyClient.find()
        res.status(200).json({
            data:result
        })
    } catch (error) {
        res.json({
            msg:"Unexpected Error"
        })
    }
    
}