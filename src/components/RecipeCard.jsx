import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {

  // Estado para manejar la visibilidad de la información nutricional
  const [showNutrition, setShowNutrition] = useState(false);
  
  // Estado para manejar los errores de carga de la imagen
  const [imageError, setImageError] = useState(false);

  // Función que maneja el error de carga de la imagen
  const handleImageError = () => {
    setImageError(true);  // Marca que hubo un error cargando la imagen
  };

  return (
    <div className="recipe-card">
      
      <div className="recipe-card-image">
        
        {/* Si no hay error de imagen, muestra la imagen de la receta, si hay error muestra un marcador de posición */}
        {!imageError ? (
          <img 
            src={recipe.image} 
            alt={recipe.label}
            onError={handleImageError}  // Llama a handleImageError si hay un error al cargar la imagen
          />
        ) : (
          <div className="recipe-image-placeholder">
            <span>Imagen no disponible</span>  {/* Mensaje que muestra cuando no se puede cargar la imagen */}
          </div>
        )}
      </div>
      
      <div className="recipe-card-content">
        <h3 className="recipe-title">{recipe.label}</h3>  {/* Título de la receta */}

        <div className="recipe-meta">
          
          {/* Muestra el tiempo de preparación, las porciones y las calorías si están disponibles */}
          <span>⏱️ {recipe.totalTime} minutos</span>
          <span>👥 {recipe.yield} porciones</span>
          {recipe.calories > 0 && <span>🔥 {Math.round(recipe.calories)} cal</span>}
        </div>

        <div className="recipe-tags">
          
          {/* Muestra las etiquetas de salud si están disponibles */}
          {recipe.healthLabels.map((label, index) => (
            <span key={index} className="tag health-tag">{label}</span>
          ))}
        </div>

        {/* Muestra la sección nutricional solo si hay información sobre proteínas, carbohidratos, grasas o fibra */}
        {(recipe.nutrition.protein > 0 || recipe.nutrition.carbs > 0 || recipe.nutrition.fat > 0 || recipe.nutrition.fiber > 0) && (
          <>
            <button 
              className="nutrition-toggle"
              onClick={() => setShowNutrition(!showNutrition)}  // Alterna la visibilidad de la información nutricional
            >
              {showNutrition ? 'Ocultar información nutricional' : 'Ver información nutricional'}
            </button>

            {showNutrition && (
              <div className="nutrition-details">
                <h4>Información Nutricional</h4>
                
                {/* Muestra la información nutricional si está disponible */}
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
            {/* Muestra la lista de ingredientes de la receta */}
            {recipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Si la receta tiene una URL, muestra un enlace para ver la receta completa */}
        {recipe.url && (
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="view-recipe-button"
            onClick={(e) => {
              if (!recipe.url) {
                e.preventDefault();  // Evita la acción si no hay URL
                alert('Lo siento, el enlace a la receta no está disponible');  // Muestra un mensaje si la URL no es válida
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

export default RecipeCard;  // Exporta el componente RecipeCard
