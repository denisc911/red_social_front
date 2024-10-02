import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './TheHeader.scss'; // Importar directamente el archivo SCSS

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        
        <Link to="/">
          <HomeOutlined /> Home
        </Link>
        <Link to="/login">
          <LoginOutlined /> Login
        </Link>
        <Link to="/register">
          <UserAddOutlined /> Register
        </Link>
        <Link to="/profile">
          <UserOutlined /> Profile
        </Link>
        {loggedIn && (
          <button onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
