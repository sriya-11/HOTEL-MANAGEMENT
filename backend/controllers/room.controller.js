const Room = require('../models/roomModel');


async function getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      return res.status(200).json(rooms);
    } catch (error) {
      console.error('Error in getAllRooms:', error);
      return res.status(500).json({ message: 'Server error fetching rooms' });
    }
  }
  
  async function getRoomById(req, res) {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      return res.status(200).json(room);
    } catch (error) {
      console.error('Error in getRoomById:', error);
      return res.status(500).json({ message: 'Server error fetching room' });
    }
  }
  

// Add a new room
async function addRoom(req, res) {
    try {
        let newRoom = req.body;
        console.log("Data to be saved:", req.body);
        //await newRoom.save();
        let room = await Room.create(newRoom);
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Update room info
async function updateRoom(req, res) {
    try {
        let { id } = req.params;
        let updatedData = req.body;
        if (updatedData.url1) {
            updatedData.url1 = updatedData.url1;  // Update URL
        }
        let room = await Room.findByIdAndUpdate(id, updatedData, { new: true });
        if (!room) {
            return res.status(404).send({ "message": "Room not found" });
        }
        res.send(room);
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

// Cancel booking manually (admin resets room status)
async function cancelRoomByAdmin(req, res) {
    try {
        let { id } = req.params;
        let room = await Room.findById(id);
        if (!room) {
            return res.status(404).send({ "message": "Room not found" });
        }

        room.status = 'available';
        room.bookedBy = null;

        await room.save();
        res.send({ "message": "Room status reset successfully", room });
    } catch (error) {
        res.status(400).send({ "message": error.message });
    }
}

async function checkRoomAvailability(req, res) {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Find bookings that conflict with the selected date range
    const overlappingBookings = await Booking.find({
      roomId: id,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(200).json({ available: false, message: 'Room is not available during selected dates' });
    }

    return res.status(200).json({ available: true, message: 'Room is available' });
  } catch (error) {
    console.error('Error in checkRoomAvailability:', error);
    return res.status(500).json({ message: 'Server error checking room availability' });
  }
}

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom,
    updateRoom,
    cancelRoomByAdmin,
    checkRoomAvailability
};
