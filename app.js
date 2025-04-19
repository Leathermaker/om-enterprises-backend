import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import formRouter from "./Router/formRouter.js";
import companyClientRouter from "./Router/companyClientRouter.js";
import employeeRouter from "./Router/employeeRouter.js";
import loginRouter from "./Router/admin.router.js";
import jobRouter from "./Router/job.router.js";
import userJobRouter from "./Router/user/job.router.js";
import planRouter from "./Router/plan.router.js";
import notificationRouter from "./Router/notification.router.js";
import blogRouter from "./Router/blog.router.js";
import dbConnect from "./utils/dbConnection.js";
import { rerunMachine } from "./rerunmachine.js";
const timeInterval = 30000;

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "*",
    "https://om-enterprises.vercel.app",
    "https://omenterprisesgroup.in",
    "http://localhost:5173"
  ],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true
};
app.options("", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

dbConnect();
app.get("/api/v1/", (req, res) => {
  res.send("Hello from OM Enterprises!");
});
//admin routes
app.use("/api/v1/admin", formRouter);
app.use("/api/v1/admin", loginRouter);
app.use("/api/v1/admin", jobRouter);
app.use("/api/v1/admin", companyClientRouter);
app.use("/api/v1/admin", employeeRouter);
app.use("/api/v1/admin/plan", planRouter);
app.use("/api/v1/user", userJobRouter);
app.use("/api/v1/admin/notification", notificationRouter);
app.use("/api/v1/blog", blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

setInterval(rerunMachine, timeInterval);

app.listen(port, () => {
  console.log(`Successfully  connected with http://localhost:${port}`);
});

