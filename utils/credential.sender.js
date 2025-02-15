import { Admin } from "../models/admin.model.js";
import {otpGenerator} from "./helpers.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

async function nodeMailerSender(admin) {
	const otp = await otpGenerator();
	console.log("otp genereated ", otp)
    admin.otp = otp
  await admin.save();
  console.log(otp);

  const adminDb = await Admin.find({ otp });
  console.log(adminDb);

  if (adminDb.length > 0) {
    setTimeout(async () => {
      adminDb.otp = null
      await adminDb.save()
      console.log(response);
    }, 100000);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "aliyah.thiel@ethereal.email",
      pass: process.env.ETHREAL_PASS
    },
    text: otp
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <aliyah.thiel@ethereal.email>', // sender address
      to: "aliyah.thiel@ethereal.email", // recipient
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `Otp: ${otp}` // HTML body
    });
  }

  main().catch(console.error);
}

async function twilioSender(admin) {
  const otp = await otpGenerator();
  admin.otp = otp
  
  await admin.save();

  const adminDb = await Admin.find({ otp });
  console.log(adminDb);

  if (adminDb.length > 0) {
    setTimeout(async () => {
      adminDb.otp = null
      await adminDb.save()
      console.log(response);
    }, 100000);
  }

  const accountSid = process.env.ACCOUNTSID;
  const authToken = process.env.AUTHTOKEN;
  const client = new twilio(accountSid, authToken);
  console.log(client, accountSid, authToken);

  async function sendSMS() {
    try {
      const message = await client.messages.create({
        body: `Do not share the OTP: ${otp}, use within 1 minute`,
        from: "+17179225895", // Your Twilio phone number
        to: "+91 7814897900",
        username: "mariah.lehner64@ethereal.email"
        // Recipient's phone number
      });

      console.log("Message sent successfully:", message.sid);
      console.log(message);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  }

  sendSMS();
}

export { nodeMailerSender, twilioSender };
