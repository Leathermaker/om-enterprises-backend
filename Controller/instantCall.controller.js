import { formContact } from "../models/contactUsForm.js";
import { footerForm } from "../models/footerFormModel.js";

async function instantCallBackQuery(req, res) {
    const { name, email, subject, message, phone } = req.body;
    try {

        const instantCallBackResp = await footerForm.create({ name, email, subject, message, phone });
        await instantCallBackResp.save();
        if (!instantCallBackResp) {
            return res.status(400).json({
                msg: "Unsuccessfully sent",
            });
        }
        return res.status(200).json({
            msg: "Successfully sent",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Unsuccessfully sent",
        })
    }
}
async function allInstantCallBackQueries(req, res) {
    try {

        const instantCallBackQueries = await footerForm.find()
        if (!instantCallBackQueries) {
            return res.status(400).json({
                msg: "Unsuccessfully",
            });
        }
        return res.status(200).json({
            msg: "footer form get successfully",
            data: instantCallBackQueries
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server error",

        });
    }
}

 async function postContactUs(req, res) {
    const {
        name,
        email,
        location,
        companyName,
        service,
        isDeveloper,
        message,
        hearAboutUs,
    } = req.body;
    try {
        const form = await formContact.create({
            name,
            email,
            location,
            companyName,
            service,
            isDeveloper,
            hearAboutUs,
            message,
        })

        await form.save();
        if (!form) {
            return res.status(402).json({
                msg: "Unsuccessfully sent",
            });
        }
        res.status(200).json({
            msg: "Successfully sent",
        });
    } catch (error) {
        console.log(error);
    }
}


async function  getAllContactQueries(req, res) {
    try {
        const result = await formContact.find();
        if (!result) {
            return res.status(402).json({
                msg: "Unsuccessfully sent",
            });
        } res.status(200).json({
            msg: "Successfully sent ",
            data : result
        });

    } catch (error) {
        console.log(error);
    }
}



export {
    instantCallBackQuery,
    allInstantCallBackQueries,
    postContactUs,
    getAllContactQueries,
}