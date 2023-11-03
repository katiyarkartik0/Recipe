import React from 'react';
import './Recipe.css'; // Import your CSS file for styling

const Recipe = ({ imageUrl, title }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <div className="button-container">
        <button className="card-button">Button 1</button>
        <button className="card-button">Button 2</button>
        <button className="card-button">Button 3</button>
        <button className="card-button">Button 3</button>
      </div>
    </div>
  );
};

export default Recipe;
