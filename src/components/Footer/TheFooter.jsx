import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import './TheFooter.scss'; 


const Footer = () => {
  return (
    <footer>
      <nav>
        <Link to="/">
          <HomeOutlined /> Home
        </Link>
        <Link to="/about">
          <InfoCircleOutlined /> About
        </Link>
        <Link to="/contact">
          <PhoneOutlined /> Contact
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
