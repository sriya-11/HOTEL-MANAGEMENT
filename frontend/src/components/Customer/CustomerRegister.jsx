import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './CustomerRegister.css';

const CustomerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Registering with:", { name, email, phoneno, password }); 
    try {
      const { data } = await API.post('/customers', {
        name,
        email,
        phoneno,
        password
      });
      console.log({ name, email, phoneno, password }); // Add this before API.post

      // ✅ Login user automatically using returned token and name
      login({ token: data.token, name: data.name, _id: data._id });

      // ✅ Show success message
      alert('Registration successful');

      // ✅ Redirect to dashboard
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='register-form' style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Customer Register</h2>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label>Phone</label>
      <input
        type="text"
        value={phoneno}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default CustomerRegister;
