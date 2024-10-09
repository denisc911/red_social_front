import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/reducers/postSlice';
import { Input, Button, notification } from 'antd';

const { TextArea } = Input;

const AddPost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAddPost = () => {
    if (content.trim() === '') {
      notification.warning({ message: 'El contenido del post no puede estar vacío' });
      return;
    }

    try {
      dispatch(addPost({ id: Date.now(), content }));
      notification.success({ message: 'Post agregado con éxito' });
      setContent(''); // Limpiar el campo de contenido después de agregar
    } catch (error) {
      notification.error({ message: 'Error al agregar el post', description: error.message });
    }
  };

  return (
    <div className="add-post-container">
      <h2>Agregar Post</h2>
      <TextArea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe el contenido del post..."
      />
      <Button type="primary" onClick={handleAddPost} style={{ marginTop: '10px' }}>
        Agregar Post
      </Button>
    </div>
  );
};

export default AddPost;
