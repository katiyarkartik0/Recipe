import React from 'react';

import './RecipeDetails.css'; // Import the CSS file

const RecipeDetails = ({id,imageUrl,title}) => {

  const handleButton1Click = () => {
    // Define the behavior for button 1 here
  };

  const handleButton2Click = () => {
    // Define the behavior for button 2 here
  };

  const handleButton3Click = () => {
    // Define the behavior for button 3 here
  };

  const handleButton4Click = () => {
    // Define the behavior for button 4 here
  };

  return (
    <div className="product-detail">
      <img src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <div className="button-container">
        <button onClick={handleButton1Click}>Ingredients</button>
        <button onClick={handleButton2Click}>Nutrition</button>
        <button onClick={handleButton3Click}>Instructions</button>
        <button onClick={handleButton4Click}>Save</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
