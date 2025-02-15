import { formContact } from "../models/contactUsForm.js";

export async function contactUsFormController(req, res) {
  const {
    name,
    email,
    location,
    companyName,
    services,
    isDeveloper,
    message,
    hearFrom,
  } = req.body;
  try {
    const form = new formContact({
      name,
      email,
      location,
      companyName,
      services,
      isDeveloper,
      hearFrom,
      message,
    });
    const result = await form.save();
    if (result) {
      res.status(200).json({
        msg: "Successfully sent",
      });
    } else {
      res.status(402).json({
        msg: "Unsuccessfully sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
}




export async function contactUsFormGetController(req, res) {

  try {
  
    const result = await formContact.find();
    if (result) {
      res.status(200).json({
        msg: result,
      });
    } else {
      res.status(402).json({
        msg: "Unsuccessfully sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
