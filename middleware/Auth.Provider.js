import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model";

const secretKey = "omenterprisesSecretKey";

const authenticate = async (req, resp, next) => {
  try {
    // take the data from the headers in token variable
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return resp.status(400).json({
        status: 400,
        success: false,
        message: "Unauthorized user. Token unavailable.",
      });
    }

    console.log(">>>>>>>>>>>", token);
    // Verify the token with secret key which we used in generating token in userModel page
    const decoded = jwt.verify(token, secretKey);

    // You can access the decoded payload

    // console.log("Decoded Token:", decoded);

    const admin = await Admin.findOne({ _id: decoded._id });

    if (!admin) throw new Error("user unavailable");
    //    sending below data to the req and capture it in isVarify function
    req.token = token;
    req.admin = admin;
    req.adminId = admin._id;

    // console.log('>>>>>>>>>>>', req.user)

    // Proceed with the next middleware or route handler
    next();
  } catch (error) {
    console.error("from Header auth JWT Verification Error:", error);
    resp.status(401).send({
      status: 401,
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authenticate;
