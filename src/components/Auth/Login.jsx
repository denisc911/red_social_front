// Importación principal de React
import React, { useState } from 'react';
// Importación principal de React
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/reducers/userSlice';
// Importación principal de React
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {email}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};


export default Login;