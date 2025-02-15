import { formPricing } from "../models/formPricing.js";

export async function servicesForm(req, res) {
  const { name, phone, email, message } = req.body;
  try {
    const form = new formPricing({ name, email, phone, message });
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
export async function servicesFormGet(req, res) {
  try {
    const result = await formPricing.find();
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
