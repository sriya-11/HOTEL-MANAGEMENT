import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.css';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <NavLink to="/" className="nav-logo">HotelApp</NavLink>
      {/* <NavLink to="/" className="nav-link">Home</NavLink> */}
      {user ? (
        <>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <button className="nav-cta" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavLink to="/register" className="nav-link">Register</NavLink>
          <NavLink to="/Admin" className="nav-link">Admin</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
