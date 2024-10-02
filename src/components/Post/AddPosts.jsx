import React, { useState } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/posts/postsSlice';


const AddPosts = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return 'El título no puede estar vacío';
    }
    if (!formData.body.trim()) {
      return 'El contenido no puede estar vacío';
    }
    if (formData.image && !['image/jpeg', 'image/png'].includes(formData.image.type)) {
      return 'La imagen debe ser JPEG o PNG';
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('body', formData.body);
    if (formData.image) postData.append('image', formData.image);

    try {
      const result = await dispatch(createPost(postData));
      setLoading(false);
      if (createPost.fulfilled.match(result)) {
        notification.success({
          message: 'Éxito',
          description: 'Post creado exitosamente',
        });
        setFormData({ title: '', body: '', image: null }); // Limpiar formulario
        navigate('/');
      } else {
        throw new Error('Error al crear el post');
      }
    } catch (error) {
      setLoading(false);
      const errorMsg = error.message || 'Error al crear el post';
      notification.error({
        message: 'Error',
        description: errorMsg,
      });
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div>
      <h1>Crear Publicación</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Título"
          required
        />
        <textarea
          name="body"
          value={formData.body}
          onChange={onChange}
          placeholder="Contenido"
          required
        />
        <input
          type="file"
          name="image"
          onChange={onChange}
          accept="image/jpeg,image/png"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Post'}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddPosts;
