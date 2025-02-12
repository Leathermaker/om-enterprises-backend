import { footerForm } from "../models/footerFormModel.js";

export async function footerFormController(req, res) {
  const { name, email, subject, message } = req.body;
  try {
    const form = new footerForm({ name, email, subject, message });
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
