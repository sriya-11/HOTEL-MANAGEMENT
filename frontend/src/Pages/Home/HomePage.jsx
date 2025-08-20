import React from 'react';
import RoomList from '../../components/Room/RoomList';
import './homePage.css';

const HomePage = () => (
  <div className="home-wrapper">
    <div className="home-container">
      <h1>Welcome to Our Hotel</h1>
      <RoomList />
    </div>
  </div>
);

export default HomePage;
