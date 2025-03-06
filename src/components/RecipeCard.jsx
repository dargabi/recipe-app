/**
 * Componente RecipeCard: Muestra una tarjeta con la información detallada de una receta
 *
 * Este componente presenta visualmente todos los datos de una receta, incluyendo:
 * - Imagen de la receta (con manejo de errores de carga)
 * - Título, tiempo de preparación, porciones y calorías
 * - Etiquetas de salud relevantes (vegetariano, vegano, etc.)
 * - Información nutricional detallada con gráfico visual
 * - Lista de ingredientes
 * - Enlace a la receta completa
 */
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaFire, FaUtensils, FaClock, FaUsers, FaLeaf, FaAppleAlt, FaBreadSlice, FaOilCan } from 'react-icons/fa';

const RecipeCard = ({ recipe, toggleFavorite, isFavorite }) => {
  // Estados del componente - Definidos antes de cualquier lógica condicional (regla de hooks)
  const [showNutrition, setShowNutrition] = useState(false); // Controla la visibilidad del panel nutricional
  const [imageError, setImageError] = useState(false);       // Detecta errores en la carga de la imagen

  // Manejo de error si no hay datos de receta
  if (!recipe) {
    return <div className="bg-red-100 dark:bg-red-900/20 p-5 rounded-xl shadow text-red-500 dark:text-red-400 text-center">Error: Datos de receta no disponibles</div>;
  }

  // Manejador de errores para cuando una imagen no se puede cargar
  const handleImageError = () => setImageError(true);

  return (
    <div className="recipe-card animate-fade-in">
      
      <div className="relative pt-[60%]">
        {/* Botón de favoritos */}
        {toggleFavorite && (
          <button 
            onClick={() => toggleFavorite(recipe)}
            className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label={isFavorite && isFavorite(recipe) ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite && isFavorite(recipe) ? (
              <FaStar className="text-yellow-500 text-xl" />
            ) : (
              <FaRegStar className="text-gray-500 dark:text-gray-400 text-xl" />
            )}
          </button>
        )}
        
        {/* Si no hay error de imagen, muestra la imagen de la receta, si hay error muestra un marcador de posición */}
        {!imageError && recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.label || 'Receta'}
            onError={handleImageError}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            <span>Imagen no disponible</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{recipe.label || 'Receta sin nombre'}</h3>

        <div className="flex flex-wrap gap-4 mb-5">
          {recipe.totalTime !== undefined && (
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              <FaClock className="text-blue-500" /> {recipe.totalTime} minutos
            </span>
          )}
          {recipe.yield !== undefined && (
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              <FaUsers className="text-green-500" /> {recipe.yield} porciones
            </span>
          )}
          {recipe.calories > 0 && 
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              <FaFire className="text-red-500" /> {Math.round(recipe.calories)} cal
            </span>
          }
        </div>

        {recipe.healthLabels && recipe.healthLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 my-5">
            {recipe.healthLabels.map((label, index) => (
              <span key={index} className="tag health-tag">{label}</span>
            ))}
          </div>
        )}

        {recipe.nutrition && (recipe.nutrition.protein > 0 || recipe.nutrition.carbs > 0 || recipe.nutrition.fat > 0 || recipe.nutrition.fiber > 0) && (
          <>
            <button 
              className="button-secondary w-full flex items-center justify-center gap-2 mt-4 mb-3"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              <FaUtensils className="text-blue-500" />
              {showNutrition ? 'Ocultar información nutricional' : 'Ver información nutricional'}
            </button>

            {showNutrition && (
              <div className="nutrition-card mt-4">
                <h4 className="font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                  <FaUtensils className="text-blue-500" /> Información Nutricional
                </h4>
                
                {/* Calorías totales */}
                <div className="flex justify-center items-center mb-5 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl">
                  <FaFire className="text-yellow-300 mr-2 text-xl" />
                  <span className="text-2xl font-bold">{Math.round(recipe.calories || 0)}</span>
                  <span className="ml-1">calorías</span>
                </div>

                {/* Contenedor para gráfico y macros */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full overflow-hidden">
                  {/* Gráfico circular de macros con porcentajes calculados */}
                  {recipe.nutrition && (recipe.nutrition.protein > 0 || recipe.nutrition.carbs > 0 || recipe.nutrition.fat > 0) && (
                    <div className="shrink-0">
                      <NutritionChart 
                        protein={recipe.nutrition.protein || 0} 
                        carbs={recipe.nutrition.carbs || 0} 
                        fat={recipe.nutrition.fat || 0} 
                      />
                    </div>
                  )}

                  {/* Valores numéricos con iconos y mejor diseño */}
                  <div className="flex flex-col gap-3 w-full min-w-0">
                    {recipe.nutrition.protein > 0 && (
                      <div className="macro-badge protein-badge overflow-hidden">
                        <FaAppleAlt className="shrink-0" /> 
                        <span className="truncate">Proteínas:</span>
                        <span className="ml-auto font-bold shrink-0">{Math.round(recipe.nutrition.protein)}g</span>
                      </div>
                    )}
                    {recipe.nutrition.carbs > 0 && (
                      <div className="macro-badge carbs-badge overflow-hidden">
                        <FaBreadSlice className="shrink-0" />
                        <span className="truncate">Carbohidratos:</span>
                        <span className="ml-auto font-bold shrink-0">{Math.round(recipe.nutrition.carbs)}g</span>
                      </div>
                    )}
                    {recipe.nutrition.fat > 0 && (
                      <div className="macro-badge fat-badge overflow-hidden">
                        <FaOilCan className="shrink-0" />
                        <span className="truncate">Grasas:</span>
                        <span className="ml-auto font-bold shrink-0">{Math.round(recipe.nutrition.fat)}g</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Barra de progreso para fibra mejorada */}
                {recipe.nutrition.fiber > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLeaf className="text-purple-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Fibra</span>
                      <span className="ml-auto bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-bold px-2 py-0.5 rounded-md">
                        {Math.round(recipe.nutrition.fiber)}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-purple-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                        style={{ width: `${Math.min(100, (recipe.nutrition.fiber / 30) * 100)}%` }}
                      >
                        {Math.round(recipe.nutrition.fiber) >= 5 && (
                          <span className="text-[10px] text-white font-bold">{Math.round((recipe.nutrition.fiber / 30) * 100)}%</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>0g</span>
                      <span>Objetivo diario: 30g</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {recipe.ingredientLines && recipe.ingredientLines.length > 0 && (
          <div className="my-5">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Ingredientes:</h4>
            <ul className="pl-0">
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 pl-5 relative before:content-['•'] before:absolute before:left-1">{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.url && (
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="button-primary block w-full text-center no-underline mt-5"
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

/**
 * Componente NutritionChart: Visualiza la distribución de macronutrientes mediante un gráfico circular
 *
 * @param {number} protein - Cantidad de proteínas en gramos
 * @param {number} carbs - Cantidad de carbohidratos en gramos
 * @param {number} fat - Cantidad de grasas en gramos
 */
const NutritionChart = ({ protein, carbs, fat }) => {
  // Suma total de macronutrientes para calcular porcentajes
  const total = protein + carbs + fat || 1; // Evitar división por cero
  
  // Cálculo de porcentajes redondeados para cada macronutriente
  const proteinPercentage = Math.round((protein / total) * 100);
  const carbsPercentage = Math.round((carbs / total) * 100);
  const fatPercentage = 100 - proteinPercentage - carbsPercentage; // Asegura que sumen 100%
  
  // Variables CSS personalizadas para generar el gráfico con conic-gradient
  const chartStyle = {
    '--protein-percentage': `${proteinPercentage}%`,
    '--carbs-percentage': `${proteinPercentage + carbsPercentage}%`,
  };

  return (
    <div className="relative flex flex-col items-center" title="Distribución de macronutrientes">
      {/* Gráfico circular */}
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <div className="nutrition-chart w-full h-full" style={chartStyle}></div>
      </div>
      
      {/* Etiqueta central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-800 dark:text-white text-xs font-bold bg-white dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center">
          Macros
        </div>
      </div>
      
      {/* Leyenda de porcentajes */}
      <div className="flex items-center justify-center gap-2 mt-2 text-xs">
        <span className="font-bold text-blue-500" title="Proteínas">{proteinPercentage}%</span>
        <span className="font-bold text-green-500" title="Carbohidratos">{carbsPercentage}%</span>
        <span className="font-bold text-red-500" title="Grasas">{fatPercentage}%</span>
      </div>
    </div>
  );
};

export default RecipeCard;  // Exporta el componente RecipeCard
