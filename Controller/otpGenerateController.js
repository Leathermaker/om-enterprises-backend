import nodemailer from "nodemailer";
import twilio from "twilio";
import otp from "otp-generator";
import { OTP } from "../models/otpModel.js";

async function otpGenerator() {
  const otpInfo = otp.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets:false,
    specialChars: false,
  });

  const otpItem = new OTP({ otp: otpInfo });
  const response = await otpItem.save();
  console.log(response);

  return otpInfo;
}

async function nodeMailerSender() {
  const otp = await otpGenerator();
  console.log(otp);

  const getOtpDb = await OTP.find({ otp });
  console.log(getOtpDb);

  if (getOtpDb.length > 0) {
    setTimeout(async () => {
      const response = await OTP.deleteOne({ otp });
      console.log(response);
    }, 100000);
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "aliyah.thiel@ethereal.email",
      pass: process.env.ETHREAL_PASS,
    },
    text: otp,
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <aliyah.thiel@ethereal.email>', // sender address
      to: "aliyah.thiel@ethereal.email", // recipient
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `Otp: ${otp}`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
}

async function twilioSender() {
  const otp = await otpGenerator();
  console.log(otp);

  const getOtpDb = await OTP.find({ otp });
  console.log(getOtpDb);

  if (getOtpDb.length > 0) {
    setTimeout(async () => {
      const response = await OTP.deleteOne({ otp });
      console.log(response);
    }, 100000);
  }


  const accountSid = process.env.ACCOUNTSID;
  const authToken = process.env.AUTHTOKEN;
  const client = new twilio(accountSid, authToken);
console.log(client, accountSid, authToken)

  async function sendSMS() {
    try {
      const message = await client.messages.create({
        body: `Do not share the OTP: ${otp}, use within 1 minute`,
        from: "+17179225895", // Your Twilio phone number
        to: "+91 7814897900",
        username: "aliyah.thiel@ethereal.email"
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

export async function otpGenerate(req, res) {
  const { creditionalId, password } = req.body;

  try {
    if (creditionalId.length) {
      // Send email OTP
      console.log("inside");
      nodeMailerSender();
      res.json({ msg: "Mail is sent successfully" });
    } else {
      // Send phone OTP
      twilioSender();
      res.json({ msg: "OTP is sent successfully" });
    }
  } catch (error) {
    console.log(error);
  }
}
