import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './components/Home/Home.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Profile from './components/Profile/Profile.jsx';
import AddPost from './components/Post/AddPost.js';
import PostDetail from './components/Post/PostDetail.jsx';
import Header from './components/Theheader/TheHeader.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;


