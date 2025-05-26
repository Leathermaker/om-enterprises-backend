import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
	try {
		await mongoose.connect(process.env.MONGOURL);
		console.log("✅ Successfully connected to MongoDB");
	} catch (error) {
		console.error("❌ Error connecting to MongoDB:", error);
	}
}

export default dbConnect;

