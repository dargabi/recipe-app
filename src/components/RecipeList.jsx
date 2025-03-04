import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {

  // Verifica si no hay recetas y muestra un mensaje indicándolo
  if (!recipes.length) {
    return (
      <div className="empty-recipes">
        <p>Busca ingredientes para ver recetas</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      
      {/* Mapea las recetas y las pasa al componente RecipeCard */}
      {recipes.map((recipeItem, index) => (
        <RecipeCard key={index} recipe={recipeItem.recipe} />
      ))}
    </div>
  );
};

export default RecipeList;  // Exporta el componente RecipeList
