// src/components/RecipeList.js
import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  if (!recipes.length) {
    return (
      <div className="empty-recipes">
        <p>Busca ingredientes para ver recetas</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipeItem, index) => (
        <RecipeCard key={index} recipe={recipeItem.recipe} />
      ))}
    </div>
  );
};

export default RecipeList;