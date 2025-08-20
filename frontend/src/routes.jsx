import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import RoomDetail from './components/Room/RoomDetail';
import CustomerDashboard from './Pages/Dashboard/CustomerDashboard';
import NotFoundPage from './Pages/NotFound/NotFoundPage';
import RoomBookingPage from './Pages/Booking/RoomBookingPage';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';

// import AdminPage from './pages/AdminPage'; 

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/rooms/:id" element={<RoomDetail />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <CustomerDashboard />
        </ProtectedRoute>
      }
    />
    {/* <Route path="/admin" element={<AdminPage />} /> */}
    <Route path='/book/:id' element={<RoomBookingPage/>}/>
    {/* <Route path="/book-room" element={<BookingPage />} />  */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
