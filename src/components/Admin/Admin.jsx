import React from 'react';

const Admin = () => {
  return (
    <div className="pagina-admin">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Desde aquí puedes gestionar usuarios, publicaciones y configuraciones.</p>

      <div className="seccion-admin">
        <h2>Gestión de Usuarios</h2>
        <p>Aquí puedes ver y administrar a los usuarios.</p>
        {/* Agrega botones o enlaces para acciones de gestión de usuarios */}
      </div>

      <div className="seccion-admin">
        <h2>Gestión de Publicaciones</h2>
        <p>Administra las publicaciones creadas por los usuarios.</p>
        {/* Agrega botones o enlaces para la gestión de publicaciones */}
      </div>

      <div className="seccion-admin">
        <h2>Configuraciones</h2>
        <p>Ajusta las configuraciones de la plataforma.</p>
        {/* Agrega botones o enlaces para las configuraciones */}
      </div>
    </div>
  );
};

export default Admin;