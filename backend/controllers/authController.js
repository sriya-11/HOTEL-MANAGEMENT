const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');

// Generate JWT Token
const generateToken = (customerId) => {
  return jwt.sign({ id: customerId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register new customer
exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    // Create new customer
    const customer = new Customer({ name, email, password });
    await customer.save();

    // Generate token
    const token = generateToken(customer._id);

    res.status(201).json({
      token,
      name: customer.name,
      id: customer._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check password (no hashing used)
    if (customer.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(customer._id);

    res.status(200).json({
      token,
      name: customer.name,
      id: customer._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
