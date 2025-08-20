require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route files
const employeeRoutes = require('./router/employee.routes');
const roomRoutes = require('./router/room.routes');
const bookingRoutes = require('./router/roombooking.routes');
const customerRoutes = require('./router/customer.routes'); // Added customer routes
const authRoutes = require('./router/authRoutes');
const connectDB = require('./utils/db.js')

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://sriyasargam:sriya@123@cluster0.30xaz.mongodb.net'; // Change if needed

// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on ${PORT}`);
});
