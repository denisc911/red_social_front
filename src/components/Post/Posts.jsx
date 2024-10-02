import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, clearError } from '../../redux/posts/postsSlice';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : error ? (
        <p>Error al cargar publicaciones: {error}</p>
      ) : (
        <Post posts={posts} />
      )}
    </div>
  );
};

export default Posts;
