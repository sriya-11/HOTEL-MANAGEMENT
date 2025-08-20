import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './RoomBookingForm.css';
import { useAuth } from '../../context/AuthContext'; // Added

const RoomBookingForm = ({ roomId, roomRentPerDay }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [roomtype, setType] = useState('');
  const [noofguests, setGuests] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContact] = useState('');
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Access logged-in customer

  console.log("Logged-in customer:", user); // Check the customer object
  const handleSubmit = async e => {
    e.preventDefault();

    // Check if customer is logged in
    if (!user || !user._id) {
      alert('You must be logged in to book a room.');
      return;
    }

    try {
      const res = await API.post('/bookings', {
        customerId: user._id, // ✅ from logged-in customer
        roomId,                    // ✅ from props
        fname,
        lname,
        roomtype,
        noOfGuests: noofguests,
        startDate: from,           // ✅ match backend field
        endDate: to,               // ✅ match backend field
        email,
        contactNo: contactno
      });
      setInvoice(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (invoice) {
    const fromDate = new Date(invoice.startDate);
    const toDate = new Date(invoice.endDate);
    const diffMs = toDate - fromDate;
    const nights = diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 1;
    const pricePerNight = Number(roomRentPerDay);
    const total = nights * pricePerNight;

    return (
      <div className="invoice-container">
        <h2>Booking Confirmed!</h2>
        <p><strong>Name:</strong> {invoice.fname} {invoice.lname}</p>
        <p><strong>Room Type:</strong> {invoice.roomtype}</p>
        <p><strong>Guests:</strong> {invoice.noOfGuests}</p>
        <p><strong>From:</strong> {invoice.startDate}</p>
        <p><strong>To:</strong> {invoice.endDate}</p>
        <p><strong>Nights:</strong> {nights}</p>
        <p><strong>Price per Night:</strong> ₹{pricePerNight}</p>
        <p><strong>Total Price:</strong> ₹{total}</p>
        <p><strong>Email:</strong> {invoice.email}</p>
        <p><strong>Contact:</strong> {invoice.contactNo}</p>
        <p><strong>Booking ID:</strong> {invoice._id}</p>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="room-booking-form">
      <h2>Book Room</h2>
      <div className="form-grid">
        <div className="form-column">
          <label>First Name</label>
          <input value={fname} onChange={e => setFname(e.target.value)} required />

          <label>Room Type</label>
          <input value={roomtype} onChange={e => setType(e.target.value)} required />

          <label>From</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="form-column">
          <label>Last Name</label>
          <input value={lname} onChange={e => setLname(e.target.value)} required />

          <label>No. of Guests</label>
          <input
            type="number"
            value={noofguests}
            onChange={e => setGuests(e.target.value)}
            min="1"
            required
          />

          <label>To</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} required />

          <label>Contact No.</label>
          <input type="tel" value={contactno} onChange={e => setContact(e.target.value)} required />
        </div>
      </div>

      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default RoomBookingForm;

