import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, likePost, unlikePost } from '../../redux/posts/postsSlice';
import { Card, Button, notification } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './PostList.styled.scss';

const { Meta } = Card;

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleLike = async (post) => {
    if (!user) {
      notification.warning({ message: 'Debes iniciar sesión para dar like' });
      return;
    }

    try {
      const isAlreadyLiked = post?.likes?.includes(user._id);
      const action = isAlreadyLiked ? unlikePost : likePost;
      await dispatch(action(post._id)).unwrap();
      notification.success({
        message: `Has ${isAlreadyLiked ? 'quitado' : 'dado'} like al post`,
      });
    } catch (error) {
      console.error('Error al dar/quitar like al post:', error);
      notification.error({ message: 'Error al dar/quitar like al post', description: error.message });
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="post-list-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="post-card">
            {post?.imageUrl && (
              <img alt="example" src={post.imageUrl} className="post-image" />
            )}
            <Meta title={post?.title || 'Título no disponible'} description={post?.body || 'Contenido no disponible'} />
            <div className="post-meta">
              <p>
                <strong>Publicado por:</strong> {post?.userId?.username || 'Usuario desconocido'}
              </p>
            </div>
            <div>
              <Button className="like-button" onClick={() => handleLike(post)}>
                {post?.likes?.includes(user?._id) ? <HeartFilled /> : <HeartOutlined />}
                {post?.likes?.length || 0} Likes
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div>No hay posts disponibles.</div>
      )}
    </div>
  );
};

export default PostList;