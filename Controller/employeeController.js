import { Employee } from "../models/employee.model.js";

export async function employeeController(req, res) {
  try {
    const { name, designation, email, phone } = req.body;
    const imageUrl = req.imageUrl; // Get the image URL from the middleware
    if (!name || !designation || !email || !phone) {
      return res.json({
        msg: "Please fill all the fields",
      });
    }
    const newTeammate = new Employee({
      name,
      designation,
      email,
      phone,
      image: imageUrl, // Save the Cloudinary URL
    });

    await newTeammate.save();
    res.status(201).json(newTeammate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating teammate" });
  }
}

export async function allEmployees(req, res) {
  try {
    const result = await Employee.find();
    res.json({
      data: result,
    });
  } catch (error) {
    res.json({
      msg: "Unexpected Error",
    });
  }
}
export async function deleteEmployee(req, res) {
  try {
    console.log("delete");
    console.log(req.body);
    const { id } = req.body;
    const result = await Employee.findOne({ _id: id });
    console.log(result);
    if (result && result !== null) {
      console.log("ih");
      const response = await Employee.deleteOne({ _id: id });
      res.json({
        data: response,
      });
    } else {
      res.json({
        msg: "This User is not Exist anymore",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Unexpected Error",
    });
  }
}

export async function updateEmployee(req, res) {
    const { name, designation, phone, email ,  } = req.body;
    const { id } = req.params;
    console.log(req.body);
  
    try {
      const employee = await Employee.findOne({ _id: id });
      if (!employee) {
        return res.status(404).json({ msg: "Employee not found" });
      }
  
      // Update the employee details
      employee.name = name || "xxxx";
      employee.image =  employee.image;
      employee.designation = designation || employee.designation;
      employee.phone = phone || employee.phone;
      employee.email = email || employee.email;
  
      await employee.save();
  
      res.status(200).json({ msg: "Employee updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Unexpected Error" });
    }
  }
  