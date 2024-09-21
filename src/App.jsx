import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';  // Importar el store desde la carpeta redux
import Home from './components/Home/Home.jsx';
import Login from './components/Auth/Login.jsx'; // Corregido a una ruta relativa
import Register from './components/Auth/Register.jsx'; // Corregido a una ruta relativa
import Profile from './components/Profile/Profile.jsx';
import AddPost from './components/Post/AddPost.jsx';
import PostDetail from './components/Post/PostDetail.jsx';
import Header from './components/TheHeader/TheHeader.jsx'; // Coincide con la ruta y nombre de archivo
import Footer from './components/Footer/Footer.jsx';
import PrivateZone from './guards/PrivateZone.jsx';
import AdminZone from './guards/AdminZone.jsx';
import NotFound from './components/NotFound/NotFound.jsx'; // Asegurarse de que el archivo NotFound existe

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateZone>
                <Profile />
              </PrivateZone>
            }
          />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route
            path="/admin"
            element={
              <AdminZone>
                <Admin /> {/* Asegúrate de que el componente Admin esté importado */}
              </AdminZone>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
