const mongoose = require("mongoose");
const RoomBooking = require('../models/bookingModel');

// Get all bookings
async function getAllBookings(req, res) {
    try {
        let bookings = await RoomBooking.find();
        res.send(bookings);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Book a room
async function bookRoom(req, res) {
    try {
        let newBooking = req.body;
        let booking = await RoomBooking.create(newBooking);
        res.status(201).send(booking);
    } catch (error) {
        console.error(error);
        res.status(400).send({ "message": error.message });
    }
}

// Cancel a booking by ID
async function cancelBooking(req, res) {
    try {
        let { id } = req.params;
        let booking = await RoomBooking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).send({ "message": "Booking not found" });
        }
        res.send({ "message": "Booking cancelled successfully" });
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}
async function getBookingsByCustomerId(req, res) {
    try {
        const { id } = req.params;
        console.log("Customer ID received:", id); // <- Add this
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid customer ID' });
        }
        
        const bookings = await RoomBooking.find({ customerId: id }).populate('roomId');
        res.status(200).send(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error); // <- Add this
        res.status(400).send({ message: error.message });
    }
}



module.exports = {
    getAllBookings,
    bookRoom,
    cancelBooking,
    getBookingsByCustomerId
};
