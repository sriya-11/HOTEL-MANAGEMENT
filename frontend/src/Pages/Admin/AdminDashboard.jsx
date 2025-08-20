import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [newRoom, setNewRoom] = useState({
    type: '',
    rentPerDay: '',
    status: 'Available',
  });

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await API.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error('Error deleting room:', err);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await API.post('/rooms', newRoom);
      setNewRoom({ type: '', rentPerDay: '', status: 'Available' });
      fetchRooms();
    } catch (err) {
      console.error('Error adding room:', err);
    }
  };

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Customer Bookings</h3>
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Room Type</th>
                <th>No. of Guests</th>
                <th>From</th>
                <th>To</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.fname} {booking.lname}</td>
                  <td>{booking.roomtype}</td>
                  <td>{booking.noOfGuests}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.email}</td>
                  <td>{booking.contactNo}</td>
                  <td>
                    <button onClick={() => deleteBooking(booking._id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3>Manage Rooms</h3>
        <form onSubmit={handleAddRoom} className="add-room-form">
          <input
            type="text"
            name="type"
            placeholder="Room Type"
            value={newRoom.type}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numberofguests"
            placeholder="Number of Guest"
            value={newRoom.numberofguest}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="facilities"
            placeholder="Facilities"
            value={newRoom.facilities}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rentPerDay"
            placeholder="Rent per Day"
            value={newRoom.rentPerDay}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newRoom.description}
            onChange={handleChange}
            required
          />
          <select name="status" value={newRoom.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          <button type="submit">Add Room</button>
        </form>

        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Type</th>
                <th>Rent/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.type}</td>
                  <td>{room.rentPerDay}</td>
                  <td>{room.status}</td>
                  <td>
                    <button onClick={() => deleteRoom(room._id)}>Delete Room</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;


