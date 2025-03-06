/**
 * Componente SkeletonLoader: Muestra una representación visual de carga de una receta
 *
 * Este componente simula la estructura visual de una tarjeta de receta mientras los datos
 * reales están siendo cargados. Implementa el patrón de diseño "skeleton loading" que mejora
 * la experiencia de usuario durante los estados de carga, mostrando la estructura aproximada
 * del contenido que eventualmente se mostrará.
 *
 * Características:
 * - Muestra un placeholders animados con efecto de pulso para indicar la carga
 * - Replica la estructura exacta de una tarjeta de receta (imagen, título, datos, etiquetas, etc.)
 * - Se adapta automáticamente a los temas claro/oscuro de la aplicación
 */
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 animate-pulse transition-all duration-300">
      {/* Placeholder para la imagen de la receta */}
      <div className="pt-[60%] relative bg-gray-200 dark:bg-gray-700">
        {/* Círculo que simula el botón de favoritos */}
        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      
      <div className="p-5">
        {/* Placeholder para el título de la receta */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 w-3/4"></div>
        
        {/* Placeholders para tiempo de preparación, porciones y calorías */}
        <div className="flex flex-wrap gap-4 mb-5">
          {/* Tiempo de preparación */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-20 flex items-center">            
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          {/* Porciones */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-24 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          {/* Calorías */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-16 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
        </div>
        
        {/* Placeholders para etiquetas de salud (vegano, vegetariano, etc.) */}
        <div className="flex flex-wrap gap-2 my-5">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 opacity-70"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 opacity-70"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14 opacity-70"></div>
        </div>
        
        {/* Placeholder para el botón de información nutricional */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg my-4 opacity-80"></div>
        
        {/* Placeholders para la lista de ingredientes */}
        <div className="my-5">
          {/* Título de sección ingredientes */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 mb-3 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          {/* Lista de ingredientes con diferentes longitudes para apariencia realista */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-10/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-9/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-8/12"></div>
          </div>
        </div>
        
        {/* Placeholder para el botón de ver receta completa */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mt-6 opacity-80"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
