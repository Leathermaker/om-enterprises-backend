import mongoose from "mongoose";


const planSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    descriptions: [{
        type: String,
        required: true
    }],
    
},
{ timestamps: true }
)


export const Plan = mongoose.model("Plan", planSchema);