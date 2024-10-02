import { Navigate } from 'react-router-dom'
import React from 'react';

const PrivateZone = ({ children }) => {
 const user = localStorage.getItem('user')
 return user ? children : <Navigate to="/login" />
}

export default PrivateZone