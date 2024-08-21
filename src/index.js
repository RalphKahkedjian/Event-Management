import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './views/Registration';
import Login from './views/Login';
import Home from './views/Home';
// import Ticket from './views/Ticket';
import ProtectedRoute from './views/ProtectedRoute';
import Logout from './views/Logout';
import Ticket from './views/Ticket';
import Booking from './views/Booking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/ticket' element={<Ticket />} />
        <Route path='/ticket' element = {<Ticket />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
