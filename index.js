import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import formRouter from "./Router/formRouter.js";
import loginRouter from "./Router/loginAdminRouter.js";
import jobRouter from "./Router/job.router.js";
import dbConnect from "./utils/dbConnection.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api/v1/admin", formRouter);
app.use("/api/v1/admin",loginRouter)
app.use("/api/v1/admin",jobRouter)


app.listen(port, () => {
  console.log(`Successfully  connected with http://localhost:${port}`);
});
