export const likeComment = (commentId) => {
    return {
      type: 'LIKE_COMMENT',
      payload: commentId,
    };
  };
  
  // Acción para quitar el like de un comentario
  export const unlikeComment = (commentId) => {
    return {
      type: 'UNLIKE_COMMENT',
      payload: commentId,
    };
  };