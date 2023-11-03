import React, { useEffect } from 'react';

import './RecipeDetails.css'; // Import the CSS file

const RecipeDetails = ({id,imageUrl,title}) => {

  useEffect(()=>{

  },[])

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
      <img className='product-image' src={imageUrl} alt={title} />
      <h1 className='product-title'>{title}</h1>
    </div>
  );
};

export default RecipeDetails;
