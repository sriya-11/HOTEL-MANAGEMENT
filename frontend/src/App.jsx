import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes';

const App = () => (
  <AuthProvider>
    <Navbar />
      <AppRoutes />
  </AuthProvider>
);

export default App;


