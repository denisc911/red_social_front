import React from 'react';
import './styles/reset.scss'; 
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import AddPost from './components/Post/AddPosts';
import PostDetail from './components/Post/PostDetail';
import Header from './components/TheHeader/TheHeader';
import Footer from './components/Footer/TheFooter';
import PrivateZone from './guards/PrivateZone';
import AdminZone from './guards/AdminZone';
import NotFound from './components/NotFound/NotFound';
import Admin from './components/Admin/Admin';
import Search from './components/Search/Search'; // Nuevo componente
// import TokenVerifier from './components/TokenVerifier/TokenVerifier'; // Nuevo componente

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        {/* <TokenVerifier> Verificación de token centralizada */}
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
                  <Admin />
                </AdminZone>
              }
            />
            <Route path="/search/:postName" element={<Search />} /> {/* Ruta de búsqueda */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </TokenVerifier> */}
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
