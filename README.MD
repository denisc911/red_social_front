# Red Social

## Descripción del proyecto
Consta del diseño de una interfaz front de una red social, donde los usuarios pueden registrarse, iniciar sesión, crear y gestionar publicaciones, y comentar en publicaciones.

## Tecnologías utilizadas
- React
- Redux
- React Router
- SASS
```
red_social_front/
│
├── public/
│   ├── index.html
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   ├── Post/
│   │   │   ├── AddPost.js
│   │   │   ├── Post.js
│   │   │   ├── PostDetail.js
│   │   │   ├── AddComment.js
│   │   ├── Profile/
│   │   │   ├── Profile.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── store.js
│   ├── App.js
│   ├── index.js
│   ├── styles/
│   │   ├── main.scss
│
├── .gitignore
├── README.md
├── package.json
└── yarn.lock or package-lock.json
```

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/my-social-app.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd red_social_front
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia la aplicación:
    ```bash
    npm start
    ```

## Estructura del Proyecto
- `src/components/`: Componentes de la aplicación.
- `src/redux/`: Configuración y lógica de Redux.
- `src/styles/`: Estilos SASS.
.


