import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          'http://localhost:3000/api/v1/auth/logout',
          {},
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        toast.success('Logged out successfully!');
        onLogout(); // Update the authentication state
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Error during logout:', error.response?.data?.error || error.message);
        toast.error('Error logging out. Please try again.');
      }
    };

    handleLogout();
  }, [onLogout, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25 text-center">
        <h2>Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
