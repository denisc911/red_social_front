// src/redux/posts/postActions.js

// Definición de la acción para alternar likes en un post
export const togglePostLike = (postId) => {
    return {
      type: 'TOGGLE_POST_LIKE',
      payload: postId,
    };
  };
  
  // Definición de la acción para obtener un post por ID
  export const fetchPostById = (postId) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        dispatch({
          type: 'FETCH_POST_BY_ID_SUCCESS',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_POST_BY_ID_FAILURE',
          error: error.message,
        });
      }
    };
  };
  
  // Definición de la acción para modificar los likes de un post
  export const modifyPostLikes = (postId, isLike) => {
    return {
      type: isLike ? 'LIKE_POST' : 'UNLIKE_POST',
      payload: postId,
    };
  };
  