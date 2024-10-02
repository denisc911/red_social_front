// src/redux/auth/authService.js

const AUTH_TOKEN_KEY = 'authToken'; // Clave para almacenar el token en el localStorage

const authService = {
  // Función para obtener el token del localStorage
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Función para guardar el token en el localStorage
  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  // Función para eliminar el token del localStorage (logout)
  removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  // Función para iniciar sesión
  async login(credentials) {
    const response = await fetch('http://tu-api.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json();
    this.setToken(data.token); // Guardamos el token en localStorage
    return data;
  },

  // Función para registrarse
  async register(userData) {
    const response = await fetch('http://tu-api.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al registrarse');
    }

    return await response.json();
  },

  // Función para verificar el token
  async verifyToken(token) {
    try {
      const response = await fetch('http://tu-api.com/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        console.error('Error al verificar el token', response.status);
        return false;
      }

      const data = await response.json();
      return data?.isValid ?? false; // Verificar si data.isValid está definido, si no, retorna false
    } catch (error) {
      console.error('Error al hacer la solicitud de verificación del token', error);
      return false;
    }
  },
  
  // Otras funciones relacionadas con la autenticación pueden añadirse aquí...
};

export default authService;
