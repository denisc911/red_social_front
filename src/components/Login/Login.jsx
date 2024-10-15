import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/auth/authSlice'; // Comentado temporalmente
import './Login.styled.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch(); // Comentado temporalmente
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Para ahora, solo mostrar la información en consola:
    console.log('Login attempt with email:', email, 'and password:', password);

    // Comentado temporalmente para que no haga la solicitud al backend:
    /*
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
    */

    // Simular un login exitoso por ahora:
    setTimeout(() => {
      console.log('Simulación de login exitoso');
      navigate('/'); // Simular redireccionamiento al home después del login
    }, 1000);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <div className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;
