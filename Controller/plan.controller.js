import { Plan } from "../models/plan.model.js";

const addPlan = async (req, res) => {
    const { title, price, descriptions,category } = req.body;
    console.log("data", req.body);

    try {
        if (!title || !price || !descriptions || !category) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const newPlan = await Plan.create({ title, category, price, descriptions });
        return res.status(200).json({message: "new plan created successfully", plan: newPlan})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};


export {
    addPlan
}