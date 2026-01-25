import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    window.location.href = '/admin'; // Redirect to admin dashboard
  };

  return <AdminLoginForm onSuccess={handleSuccess} />;
};

export default AdminLogin;
