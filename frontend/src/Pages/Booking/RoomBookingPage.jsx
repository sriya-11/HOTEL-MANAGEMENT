// src/pages/Booking/RoomBookingPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import RoomBookingForm from '../../components/Booking/RoomBookingForm';
import './RoomBookingPage.css';

const RoomBookingPage = () => {
  const { id } = useParams();

  return (
    <div className="booking-page-container">
      {/* <h2>Room Booking</h2> */}
      <RoomBookingForm roomId={id} />
    </div>
  );
};

export default RoomBookingPage;

