// src/redux/comments/commentAPI.js

// Definición de la API para los comentarios
const commentAPI = {
    // Obtener todos los comentarios
    fetchComments: async () => {
      try {
        const response = await fetch('/api/comments');
        if (!response.ok) {
          throw new Error('Error al obtener los comentarios');
        }
        return await response.json();
      } catch (error) {
        console.error('Error en fetchComments:', error);
        throw error;
      }
    },
  
    // Agregar un comentario
    addComment: async (comment) => {
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        });
        if (!response.ok) {
          throw new Error('Error al agregar el comentario');
        }
        return await response.json();
      } catch (error) {
        console.error('Error en addComment:', error);
        throw error;
      }
    },
  
    // Dar like a un comentario
    likeComment: async (commentId) => {
      try {
        const response = await fetch(`/api/comments/${commentId}/like`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Error al dar like al comentario');
        }
        return await response.json();
      } catch (error) {
        console.error('Error en likeComment:', error);
        throw error;
      }
    },
    
    // Quitar el like de un comentario
    unlikeComment: async (commentId) => {
      try {
        const response = await fetch(`/api/comments/${commentId}/unlike`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Error al quitar el like del comentario');
        }
        return await response.json();
      } catch (error) {
        console.error('Error en unlikeComment:', error);
        throw error;
      }
    },
  };
  
  // Exportar como exportación por defecto
  export default commentAPI;
  