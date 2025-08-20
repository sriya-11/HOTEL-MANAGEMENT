// src/components/Room/RoomList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import API from '../../services/api';  // Keep only API import
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await API.get('/rooms');  // Use API.get to fetch rooms
        setRooms(response.data);  // Update state with room data
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err);  // Handle error if fetch fails
      }
    };

    fetchRooms();
  }, []);  // Empty dependency array to run once on component mount

  if (error) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Error loading rooms.</p>;
  }

  if (!rooms.length) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Loading rooms…</p>;
  }

  return (
    <div className="room-list">
      <h2>Available Rooms</h2>
      <div className="room-grid">
        {rooms.map(room => (
          <div key={room._id} className="room-card">
            <img src={room.url1} alt={room.roomname} className="room-image" />
            <div className="room-info">
              <h3>{room.roomname}</h3>
              <p>{room.description}</p>
              <p><strong>Rent:</strong> ₹{room.rentperday} / night</p>
              <Link to={`/rooms/${room._id}`} className="details-button">More Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
