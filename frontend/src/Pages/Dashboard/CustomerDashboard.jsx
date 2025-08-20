import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import './customerDashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get(`/bookings/customer/${user._id}`);
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.delete(`/bookings/${bookingId}`);
      alert('Booking cancelled successfully');
      fetchBookings(); // Refresh booking list
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking');
    }
  };

  if (!user) {
    return <p className="dashboard-message">Please log in to view your dashboard.</p>;
  }

  return (
    <div className="customer-dashboard">
      <h1>Hello, {user.name}</h1>
      <p>Welcome to your dashboard.</p>

      <h2>Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="dashboard-message">No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.roomId?.name || 'Room Name Unavailable'}</h3>
              <p><strong>Type:</strong> {booking.roomId?.type || 'N/A'}</p>
              <p><strong>Guests:</strong> {booking.noOfGuests}</p>
              <p><strong>Check-in:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status || 'Confirmed'}</p>
              <button
                className="cancel-button"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;

