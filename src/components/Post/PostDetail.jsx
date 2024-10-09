import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, togglePostLike, modifyPostLikes } from '../../redux/posts/postActions'; // Cambiar el nombre del slice
import { useParams } from 'react-router-dom';
import { Card, notification, Input, Button } from 'antd';
import { HeartOutlined, HeartFilled, LikeOutlined, LikeFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import commentsAPI from '../../redux/comments/commentAPI'; // Cambiar el nombre del servicio
import { likeComment as addLikeToComment, unlikeComment as removeLikeFromComment } from '../../redux/comments/commentActions'; // Cambiar el nombre del slice
import FollowUserButton from '../FollowUserButton/FollowUserButton'; // Cambiar el nombre del componente
import './PostDetailStyled.scss'; // Cambiar el nombre del archivo de estilos

const { Meta } = Card;
const { TextArea } = Input;

// Componente para mostrar los comentarios
const CommentSection = ({ comments, currentUser, handleLike, handleEdit, handleRemove }) => (
  <div className="comments-section">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <Card key={comment._id} className="comment-box">
          <Meta title={comment.userId ? comment.userId.username : "Usuario desconocido"} description={comment.comment} />
          <div className="comment-actions">
            <Button className="like-btn" onClick={() => handleLike(comment._id)}>
              {comment.likes && comment.likes.includes(currentUser?._id) ? <LikeFilled /> : <LikeOutlined />}
              {comment.likes ? comment.likes.length : 0} Likes
            </Button>
            {currentUser && currentUser._id === comment.userId?._id && (
              <>
                <Button onClick={() => handleEdit(comment._id, comment.comment)}><EditOutlined />Editar</Button>
                <Button onClick={() => handleRemove(comment._id)}><DeleteOutlined />Eliminar</Button>
              </>
            )}
          </div>
        </Card>
      ))
    ) : (
      <div>No hay comentarios aún.</div>
    )}
  </div>
);

// Componente para mostrar la publicación
const PostContent = ({ post, currentUser, handlePostLike }) => (
  <Card className="post-box">
    {post.imageUrl && <img alt="example" src={post.imageUrl} className="post-image" />}
    <Meta title={post.title} description={post.body} />
    <div className="post-meta">
      <p>
        <strong>Publicado por:</strong> {post.userId ? post.userId.username : "Usuario desconocido"}
        {post.userId && post.userId._id !== currentUser?._id && <FollowUserButton targetUserId={post.userId._id} />}
      </p>
    </div>
    <div>
      <Button className="like-btn" onClick={handlePostLike}>
        {post.likes && post.likes.includes(currentUser?._id) ? <HeartFilled /> : <HeartOutlined />}
        {post.likes ? post.likes.length : 0} Likes
      </Button>
    </div>
  </Card>
);

const PostDetailView = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);

  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        await dispatch(fetchPostById(_id));
        await retrieveComments();
      } catch (error) {
        console.error('Error al cargar el post o comentarios:', error);
        notification.error({ message: 'Error al cargar datos', description: error.message });
      }
    };
    loadPostAndComments();
  }, [dispatch, _id]);

  useEffect(() => {
    if (post && post.likes) {
      const userLiked = post.likes.includes(user?._id);
      setIsPostLiked(userLiked);
      setLikesCount(post.likes.length);
    }
  }, [post, user]);

  const retrieveComments = useCallback(async () => {
    try {
      const fetchedComments = await commentsAPI.getCommentsByPost(_id);
      setComments(fetchedComments || []);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      notification.error({ message: 'Error al cargar comentarios', description: error.message });
    }
  }, [_id]);

  const togglePostLike = useCallback(async () => {
    if (!user) {
      notification.warning({ message: 'Debes iniciar sesión para dar like' });
      return;
    }

    try {
      const isAlreadyLiked = post.likes?.includes(user._id);
      const updatedLikes = isAlreadyLiked
        ? post.likes.filter(id => id !== user._id)
        : [...(post.likes || []), user._id];

      dispatch(modifyPostLikes({ ...post, likes: updatedLikes }));
      setLikesCount(updatedLikes.length);
      setIsPostLiked(!isAlreadyLiked);

      await dispatch(togglePostLike(post._id)).unwrap();

      notification.success({
        message: `Has ${isAlreadyLiked ? 'quitado' : 'dado'} like al post`,
      });
    } catch (error) {
      console.error('Error al dar/quitar like al post:', error);
      notification.error({ message: 'Error al dar/quitar like al post', description: error.message });
    }
  }, [user, post, dispatch]);

  const submitComment = useCallback(async () => {
    if (!newCommentText) {
      notification.warning({ message: 'El comentario no puede estar vacío' });
      return;
    }

    try {
      if (activeCommentId) {
        await commentsAPI.updateComment(activeCommentId, { comment: newCommentText });
        notification.success({ message: 'Comentario editado con éxito' });
        setActiveCommentId(null);
      } else {
        await commentsAPI.createComment({ comment: newCommentText, postId: _id });
        notification.success({ message: 'Comentario agregado con éxito' });
      }

      setNewCommentText('');
      await retrieveComments();
    } catch (error) {
      console.error('Error al agregar/editar comentario:', error);
      notification.error({ message: 'Error al agregar/editar comentario', description: error.message });
    }
  }, [newCommentText, activeCommentId, _id, retrieveComments]);

  const likeCommentHandler = useCallback(async (commentId) => {
    if (!user) {
      notification.warning({ message: 'Debes iniciar sesión para dar like al comentario' });
      return;
    }

    try {
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          const hasLiked = comment.likes && comment.likes.includes(user._id);
          const updatedLikes = hasLiked
            ? comment.likes.filter((userId) => userId !== user._id)
            : [...(comment.likes || []), user._id];

          return { ...comment, likes: updatedLikes };
        }
        return comment;
      });

      setComments(updatedComments);

      const action = updatedComments.find(comment => comment._id === commentId).likes.includes(user._id)
        ? addLikeToComment
        : removeLikeFromComment;

      await dispatch(action(commentId)).unwrap();
      notification.success({ message: 'Like actualizado con éxito' });
    } catch (error) {
      console.error('Error al dar like al comentario:', error);
      notification.error({ message: 'Error al dar like al comentario', description: error.message });
    }
  }, [user, comments, dispatch]);

  const initiateEditComment = useCallback((commentId, currentComment) => {
    setActiveCommentId(commentId);
    setNewCommentText(currentComment);
  }, []);

  const removeComment = useCallback(async (commentId) => {
    try {
      await commentsAPI.deleteComment(commentId);
      notification.success({ message: 'Comentario eliminado con éxito' });
      await retrieveComments();
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      notification.error({ message: 'Error al eliminar comentario', description: error.message });
    }
  }, [retrieveComments]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post no encontrado.</div>;
  }

  return (
    <div className="post-detail">
      <PostContent post={post} currentUser={user} handlePostLike={togglePostLike} />
      <div className="comment-input">
        <TextArea
          rows={4}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Escribe tu comentario..."
        />
        <Button type="primary" onClick={submitComment}>{activeCommentId ? 'Actualizar Comentario' : 'Agregar Comentario'}</Button>
      </div>
      <CommentSection
        comments={comments}
        currentUser={user}
        handleLike={likeCommentHandler}
        handleEdit={initiateEditComment}
        handleRemove={removeComment}
      />
    </div>
  );
};

export default PostDetailView;
