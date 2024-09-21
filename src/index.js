import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';  // Mismo cambio aquí para la importación del store


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
