import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 animate-pulse transition-all duration-300">
      {/* Imagen de carga */}
      <div className="pt-[60%] relative bg-gray-200 dark:bg-gray-700">
        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      
      <div className="p-5">
        {/* Título */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 w-3/4"></div>
        
        {/* Tiempo, porciones, calorías */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-20 flex items-center">            
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-24 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-16 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
        </div>
        
        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2 my-5">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 opacity-70"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 opacity-70"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14 opacity-70"></div>
        </div>
        
        {/* Botón información nutricional */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg my-4 opacity-80"></div>
        
        {/* Lista de ingredientes */}
        <div className="my-5">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 mb-3 flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ml-2"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-11/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-10/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-9/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-8/12"></div>
          </div>
        </div>
        
        {/* Botón ver receta */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mt-6 opacity-80"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
