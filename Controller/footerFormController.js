import { footerForm } from "../models/footerFormModel.js";
import { Notification } from "../models/notification.model.js";

import { footerForm } from "../models/footerForm.model.js"; // adjust path as needed
import { Notification } from "../models/notification.model.js"; // adjust path as needed

export async function footerFormController(req, res) {
  const { name, email, subject, message } = req.body;

  try {
    const form = new footerForm({ name, email, subject, message });
    const result = await form.save();
    console.log(result);
    if (result) {
      console.log("Form saved:", result);
      
     

      return res.status(200).json({
        msg: "Successfully sent",
      });
    } else {
      return res.status(400).json({
        msg: "Unsuccessfully sent",
      });
    }
  } catch (error) {
    console.error("Error in footerFormController:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

export async function footerFormGet(req, res) {
  try {

    const result = await footerForm.find()
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
