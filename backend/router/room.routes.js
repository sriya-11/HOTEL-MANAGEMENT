const express = require('express');
const router = express.Router();
const {
    getAllRooms,
    getRoomById,
    addRoom,
    updateRoom,
    cancelRoomByAdmin,
    checkRoomAvailability
} = require('../controllers/room.controller');

router.get('/', getAllRooms);
router.get('/:id',getRoomById);
router.post('/', addRoom);
router.put('/:id', updateRoom);
router.patch('/cancel/:id', cancelRoomByAdmin);
router.get('/availability/:id', checkRoomAvailability);


module.exports = router;
