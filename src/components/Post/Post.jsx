import React from 'react';
import PostItem from './PostItem'; // Importamos el componente individual

const Post = ({ posts }) => { // Ahora pasamos los posts como props
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <PostItem key={post._id} post={post} index={index} /> // Usamos el componente PostItem
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p> // Manejo de caso cuando no hay publicaciones
      )}
    </div>
  );
};

export default Post;
