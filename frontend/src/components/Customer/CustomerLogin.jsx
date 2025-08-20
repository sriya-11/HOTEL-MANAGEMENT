import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [email, setEmail] = useState(''); // changed from cusemail
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/customers/login', { email, password }); // use "email"
      login({ token: data.token, name: data.name, _id: data._id });
      localStorage.setItem('token', data.token);
      
      alert('Login successful'); // success alert

      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form' style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Customer Login</h2>
      <label>Email</label>
      <input
        type="email"
        value={email} // updated
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default CustomerLogin;
