import mongoose from "mongoose";


async function dbConnect() {	
	try {
		const response = 	mongoose.connect(process.env.MONGOURL, {
		    
		}
		)
		console.log("Successfully connect with mongodb")
	} catch (error) {
		console.log(error)
	}
}

export default dbConnect