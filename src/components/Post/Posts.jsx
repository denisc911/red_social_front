import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAll } from '../../redux/posts/postsSlice';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
}

export default Posts;
