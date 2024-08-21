import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    navigate('/login');
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <h3 className="text-white">Logging out...</h3>
    </div>
  );
}

export default Logout;
