const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

async function getAllCustomers(req, res) {
    try {
        let customers = await Customer.find();
        res.send(customers);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}
async function getCustomerById(req, res) {
    try {
        let { id } = req.params;
        let customer = await Customer.findOne({ _id: id });
        if (customer) {
            res.send(customer);
        } else {
            res.status(404).send({ "message": "Invalid id" });
        }
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

async function addCustomer(req, res) {
    try {
        let newCustomer = req.body;
        //await customer.save();
        let customer = await Customer.create(newCustomer);
        // console.log(newCustomer);
        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}
  

async function updateCustomer(req, res) {
    try {
        let updatedData = req.body;
        let { id } = req.params;
        updatedData = await Customer.findOneAndUpdate({ _id: id }, updatedData, { new: true });
        if (updatedData) {
            res.status(200).send(updatedData);
        } else {
            res.status(404).send({ "message": "Invalid id" });
        }
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

async function deleteCustomer(req, res) {
    try {
        let { id } = req.params;
        let customer = await Customer.findOneAndDelete({ _id: id });
        if (customer) {
            res.status(200).send(customer);
            console.log("deleted");
        } else {
            res.status(404).send({ "message": "Invalid id" });
        }
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}


async function customerLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await Customer.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).send({ token, name: user.name, _id: user._id });
    } catch (error) {
        console.error('login error:',error);
        return res.status(500).send({ message: "Server Error" });
    }

}

async function registerCustomer(req, res) {
    try {
      //console.log("REQ.BODY:", req.body); // Check what frontend sends
  
      const customer = new Customer(req.body); // Must match schema
      await customer.save();
  
      const token = jwt.sign(
        { id: customer._id, email: customer.email },
        process.env.JWT_SECRET
      );
  
      res.status(201).send({
        message: "Customer registered successfully",
        token,
        name: customer.name,
        _id: customer._id
      });
    } catch (err) {
      console.error("ERROR:", err);
      if (err.code === 11000 && err.keyPattern?.email) {
        return res.status(400).send({ message: "Email already registered" });
      }
      res.status(500).send({ message: "Server Error" });
    }
  }
  
module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    customerLogin,
    registerCustomer
};