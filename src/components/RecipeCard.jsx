// src/components/RecipeCard.js
import React from 'react';
import './RecipeCard.css';

// Función para traducir etiquetas de salud comunes
const translateHealthLabel = (label) => {
  const translations = {
    'Vegetarian': 'Vegetariano',
    'Vegan': 'Vegano', 
    'Peanut-Free': 'Sin Maní',
    'Tree-Nut-Free': 'Sin Frutos Secos',
    'Sugar-Free': 'Sin Azúcar',
    'Alcohol-Free': 'Sin Alcohol',
    'Gluten-Free': 'Sin Gluten',
    'Dairy-Free': 'Sin Lácteos',
    'Egg-Free': 'Sin Huevo',
    'Soy-Free': 'Sin Soja',
    'Fish-Free': 'Sin Pescado',
    'Shellfish-Free': 'Sin Mariscos',
    'Paleo': 'Paleo',
    'Keto': 'Keto',
    'Low-Sugar': 'Bajo en Azúcar',
    'No oil added': 'Sin Aceite Añadido',
    'Low-Fat': 'Bajo en Grasa',
    'Low-Carb': 'Bajo en Carbohidratos',
    'Low-Sodium': 'Bajo en Sodio',
    'Low-Potassium': 'Bajo en Potasio',
    'Kosher': 'Kosher',
    'Alcohol-Cocktail': 'Cóctel con Alcohol',
    'Crustacean-Free': 'Sin Crustáceos',
    'Red-Meat-Free': 'Sin Carne Roja',
    'Lupine-Free': 'Sin Lupino',
    'Mollusk-Free': 'Sin Moluscos',
    'Mustard-Free': 'Sin Mostaza',
    'Wheat-Free': 'Sin Trigo',
    'Sesame-Free': 'Sin Sésamo',
    'Celery-Free': 'Sin Apio',
    'FODMAP-Free': 'Sin FODMAP',
    'Pork-Free': 'Sin Cerdo',
    'Immuno-Supportive': 'Apoyo Inmunológico',
    'Kidney-Friendly': 'Amigable con Riñones',
    'Mediterranean': 'Mediterráneo',
    'Sulfite-Free': 'Sin Sulfitos'
  };
  
  return translations[label] || label;
};

// Función para traducir etiquetas de dieta comunes
const translateDietLabel = (label) => {
  const translations = {
    'Balanced': 'Equilibrado',
    'High-Protein': 'Alto en Proteínas',
    'High-Fiber': 'Alto en Fibra',
    'Low-Fat': 'Bajo en Grasa',
    'Low-Carb': 'Bajo en Carbohidratos',
    'Low-Sodium': 'Bajo en Sodio'
  };
  
  return translations[label] || label;
};

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
          {recipe.healthLabels.slice(0, 3).map((label, index) => (
            <span key={index} className="tag health-tag">
              {translateHealthLabel(label)}
            </span>
          ))}
          {recipe.dietLabels.slice(0, 2).map((label, index) => (
            <span key={index} className="tag diet-tag">
              {translateDietLabel(label)}
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