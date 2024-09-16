import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/reducers/postSlice';

const AddPost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddPost = () => {
    // Aquí deberías manejar el agregar post real
    dispatch(addPost({ id: Date.now(), content }));
  };

  return (
    <div>
      <h2>Add Post</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default AddPost;
