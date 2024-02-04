// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css'; // Add this line
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
