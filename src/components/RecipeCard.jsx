import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        {!imageError ? (
          <img 
            src={recipe.image} 
            alt={recipe.label}
            onError={handleImageError}
          />
        ) : (
          <div className="recipe-image-placeholder">
            <span>Imagen no disponible</span>
          </div>
        )}
      </div>
      
      <div className="recipe-card-content">
        <h3 className="recipe-title">{recipe.label}</h3>
        
        <div className="recipe-meta">
          <span>⏱️ {recipe.totalTime} minutos</span>
          <span>👥 {recipe.yield} porciones</span>
          {recipe.calories > 0 && <span>🔥 {Math.round(recipe.calories)} cal</span>}
        </div>

        <div className="recipe-tags">
          {recipe.healthLabels.map((label, index) => (
            <span key={index} className="tag health-tag">{label}</span>
          ))}
        </div>

        {(recipe.nutrition.protein > 0 || recipe.nutrition.carbs > 0 || recipe.nutrition.fat > 0 || recipe.nutrition.fiber > 0) && (
          <>
            <button 
              className="nutrition-toggle"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              {showNutrition ? 'Ocultar información nutricional' : 'Ver información nutricional'}
            </button>

            {showNutrition && (
              <div className="nutrition-details">
                <h4>Información Nutricional</h4>
                {recipe.nutrition.protein > 0 && (
                  <div className="nutrition-item">
                    <span>Proteínas:</span>
                    <span>{Math.round(recipe.nutrition.protein)}g</span>
                  </div>
                )}
                {recipe.nutrition.carbs > 0 && (
                  <div className="nutrition-item">
                    <span>Carbohidratos:</span>
                    <span>{Math.round(recipe.nutrition.carbs)}g</span>
                  </div>
                )}
                {recipe.nutrition.fat > 0 && (
                  <div className="nutrition-item">
                    <span>Grasas:</span>
                    <span>{Math.round(recipe.nutrition.fat)}g</span>
                  </div>
                )}
                {recipe.nutrition.fiber > 0 && (
                  <div className="nutrition-item">
                    <span>Fibra:</span>
                    <span>{Math.round(recipe.nutrition.fiber)}g</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="recipe-ingredients">
          <h4>Ingredientes:</h4>
          <ul>
            {recipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {recipe.url && (
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="view-recipe-button"
            onClick={(e) => {
              if (!recipe.url) {
                e.preventDefault();
                alert('Lo siento, el enlace a la receta no está disponible');
              }
            }}
          >
            Ver receta completa
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;