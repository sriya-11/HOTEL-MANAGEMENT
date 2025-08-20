const express = require('express');
const router = express.Router();
const {
    getAllBookings,
    bookRoom,
    cancelBooking,
    getBookingsByCustomerId,
} = require('../controllers/roombooking.controller');


router.get('/', getAllBookings);
router.post('/', bookRoom);
router.delete('/:id', cancelBooking);
router.get('/customer/:id', getBookingsByCustomerId);

module.exports = router;
