import mongoose from "mongoose";


async function dbConnect() {	
	try {
		const response = 	mongoose.connect('mongodb://localhost:27017/om')
		console.log("Successfully connect with mongodb")
	} catch (error) {
		console.log(error)
	}
}

export default dbConnect