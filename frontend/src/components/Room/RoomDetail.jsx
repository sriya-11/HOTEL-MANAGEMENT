// src/components/Room/RoomDetail.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext'; // import auth
import './RoomDetail.css';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // get auth state
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // If not logged in, redirect
    if (!isLoggedIn) {
      alert('Please log in to view room details.');
      navigate('/login');
      return;
    }

    const fetchRoom = async () => {
      try {
        const res = await API.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id, isLoggedIn, navigate]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className='room-detail-container' style={{ padding: '2rem' }}>
      <h2>{room.roomname}</h2>

      <div className="room-images">
        <img src={room.url1} alt="Room 1" />
        <img src={room.url2} alt="Room 2" />
        <img src={room.url3} alt="Room 3" />
      </div>

      <p><strong>Room Type:</strong> {room.roomtype}</p>
      <p><strong>Number of Guests:</strong> {room.noOfguests}</p>
      <p><strong>Facilities:</strong> {room.facilities}</p>
      <p><strong>Rent per Day:</strong> ₹{room.rentperday}</p>
      <p><strong>Description:</strong> {room.description}</p>
      <p><strong>Current Bookings:</strong> {room.currentbookings.length > 0 ? room.currentbookings.length : 'None'}</p>
       
      <button className='book-now-button' onClick={() => navigate(`/book/${room._id}`)}>Book Now</button>
    </div>
  );
};

export default RoomDetail;
