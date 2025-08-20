const Employee = require('../models/employeeModel.js');

// Get all employees
async function getAllEmployees(req, res) {
    try {
        let employees = await Employee.find();
        res.send(employees);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    } 
}

// Get employee by ID
async function getEmployeeById(req, res) {
    try {
        let { id } = req.params;
        let employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send({ "message": "Employee not found" });
        }
        res.send(employee);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Add new employee
async function addEmployee(req, res) {
    try {
        let newEmployee = req.body;
        let employee = await Employee.create(newEmployee);
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Update employee by ID
async function updateEmployee(req, res) {
    try {
        let { id } = req.params;
        let updatedData = req.body;
        let employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        if (!employee) {
            return res.status(404).send({ "message": "Employee not found" });
        }
        res.send(employee);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Delete employee by ID
async function deleteEmployee(req, res) {
    try {
        let { id } = req.params;
        let employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).send({ "message": "Employee not found" });
        }
        res.send({ "message": "Employee deleted successfully" });
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
