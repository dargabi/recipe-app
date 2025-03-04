// src/components/RecipeCard.js
import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.label} />
      </div>
      
      <div className="recipe-card-content">
        <h2 className="recipe-title">{recipe.label}</h2>
        
        <div className="recipe-meta">
          <span>
            <i className="time-icon">⏱️</i> 
            {recipe.totalTime > 0 
              ? `${recipe.totalTime} min` 
              : 'Tiempo no especificado'}
          </span>
          <span>
            <i className="servings-icon">👥</i> 
            {recipe.yield} porciones
          </span>
        </div>
        
        <div className="recipe-ingredients">
          <h3>Ingredientes:</h3>
          <ul>
            {recipe.ingredientLines.slice(0, 5).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
            {recipe.ingredientLines.length > 5 && (
              <li className="more-ingredients">
                +{recipe.ingredientLines.length - 5} más
              </li>
            )}
          </ul>
        </div>
        
        <div className="recipe-tags">
          {recipe.healthLabels && recipe.healthLabels.slice(0, 3).map((label, index) => (
            <span key={index} className="tag health-tag">
              {label}
            </span>
          ))}
          {recipe.dietLabels && recipe.dietLabels.slice(0, 2).map((label, index) => (
            <span key={index} className="tag diet-tag">
              {label}
            </span>
          ))}
        </div>
        
        <a 
          href={recipe.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="view-recipe-button"
        >
          Ver Receta Completa
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;