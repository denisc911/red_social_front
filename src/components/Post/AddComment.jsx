import React, { useState } from 'react';

const AddComment = () => {
}
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment, getCommentsByPost } from '../../redux/comments/commentsSlice';
import { Input, Button, notification } from 'antd';

const { TextArea } = Input;

const AddCommentForm = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      return notification.warning({ message: 'El comentario no puede estar vacío' });
    }

    try {
      // Crear el comentario mediante Redux y limpiar el estado
      await dispatch(createComment({ comment: newComment, postId })).unwrap();
      setNewComment("");

      // Actualizar los comentarios del post para reflejar el nuevo comentario
      dispatch(getCommentsByPost(postId));
      notification.success({ message: 'Comentario publicado con éxito' });
    } catch (error) {
      notification.error({ message: 'Error al publicar el comentario', description: error.message });
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <TextArea
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Añadir un comentario"
      />
      <Button type="primary" onClick={handleCommentSubmit} style={{ marginTop: '10px' }}>
        Publicar Comentario
      </Button>
    </div>
  );
};

export default AddCommentForm;
