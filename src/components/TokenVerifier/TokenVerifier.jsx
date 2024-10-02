import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../redux/auth/authService';

const TokenVerifier = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = authService.getToken();

        if (!token || !isAuthenticated) {
          navigate('/login');
          return;
        }

        const isValid = await authService.verifyToken(token);
        if (!isValid) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verificando el token', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [navigate, isAuthenticated]);

  if (isLoading) {
    return <p>Verificando autenticación...</p>;
  }

  return children;
};

export default TokenVerifier;
