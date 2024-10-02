import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/reducers/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn); // Obtener el estado de loggedIn

  const handleLogin = () => {
    dispatch(login({ email }));
  };

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {email}!</h2>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduce tu E-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce tu contraseña"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
