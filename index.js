import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import formRouter from "./Router/formRouter.js";
import companyClientRouter from "./Router/companyClientRouter.js";
import employeeRouter from "./Router/employeeRouter.js";
import loginRouter from "./Router/admin.router.js"; 
import jobRouter from "./Router/job.router.js"; 
import userJobRouter from "./Router/user/job.router.js"; 
import planRouter from "./Router/plan.router.js"
import dbConnect from "./utils/dbConnection.js";

const app = express();
const port = 3100;
const corsOptions = {
  origin: "*",
  methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true,
 
};

app.use(cors(corsOptions));
app.use(express.json());

dbConnect();


//admin routes
app.use("/api/v1/admin", formRouter);

//admin
app.use("/api/v1/admin",loginRouter)


app.use("/api/v1/admin",jobRouter)


//company client  logo img stars comment name

app.use('/api/v1/admin',companyClientRouter)

app.use('/api/v1/admin',employeeRouter)
app.use('/api/v1/admin/plan',planRouter)

//user routes
app.use("/api/v1/user", userJobRouter);

app.listen(port|| 4000, () => {
  console.log(`Successfully  connected with http://localhost:${port}`);
});
