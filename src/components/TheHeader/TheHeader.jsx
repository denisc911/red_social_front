import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import PostCreate from '../Posts/PostCreate';
import { Modal } from 'antd';
import './TheHeader.scss';

const AuthLinks = ({ loggedIn, onLogout, userName }) => (
  <>
    {loggedIn ? (
      <>
        <Link to="/profile">
          <UserOutlined /> Profile {userName}
        </Link>
        <button onClick={onLogout}>
          <LogoutOutlined /> Logout
        </button>
      </>
    ) : (
      <>
        <Link to="/login">
          <LoginOutlined /> Login
        </Link>
        <Link to="/register">
          <UserAddOutlined /> Register
        </Link>
      </>
    )}
  </>
);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const loggedIn = !!user;

  const [searchText, setSearchText] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  }, [dispatch, navigate]);

  const handleCreatePostModal = () => {
    setShowCreatePost(true);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText)}`);
      setShowSearchModal(false);
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <HomeOutlined /> Home
        </Link>

        <button onClick={() => setShowSearchModal(true)} className="button secondary">
          <SearchOutlined /> Buscar
        </button>

        <Modal
          title="Buscar Publicación"
          open={showSearchModal}
          onCancel={() => setShowSearchModal(false)}
          footer={null}
        >
          <input
            placeholder="Escribe tu búsqueda"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </Modal>

        {loggedIn && (
          <>
            <button onClick={handleCreatePostModal} className="button primary">
              <PlusOutlined /> Crear
            </button>

            <Modal
              open={showCreatePost}
              onCancel={() => setShowCreatePost(false)}
              footer={null}
              className="modal-create"
            >
              <PostCreate onClose={() => setShowCreatePost(false)} />
            </Modal>
          </>
        )}

        <AuthLinks loggedIn={loggedIn} onLogout={handleLogout} userName={user?.name} />
      </nav>
    </header>
  );
};

export default Header;
