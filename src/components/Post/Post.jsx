import React from 'react';
import { useSelector } from 'react-redux';

const Post = () => {
  const { posts } = useSelector(state => state.posts);

  return (
    <>
      {posts.map((post, index) => (
        <div key={post._id} className="post">
          <h2>Post nº {index}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}

export default Post;
