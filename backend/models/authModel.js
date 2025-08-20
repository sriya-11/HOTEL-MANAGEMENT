const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // You can set a minimum length for better security
  },
});

// Method to compare entered password with the stored one (since we're not using bcrypt)
customerSchema.methods.isPasswordMatch = function (enteredPassword) {
  return enteredPassword === this.password;
};

module.exports = mongoose.model('Customer', customerSchema);
