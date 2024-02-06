// WelcomePage.jsx

import React from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onNext }) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to Your GIS Web App</h1>
      <p className="welcome-text">
        Explore the world with our interactive maps and powerful GIS features.
      </p>
      <button className="continue-button" onClick={onNext}>
        Continue
      </button>
      <div className="animation-container">
        <div className="animation-circle"></div>
      </div>
    </div>
  );
};

export default WelcomePage;
