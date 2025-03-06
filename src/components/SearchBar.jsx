// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch, FaSpinner, FaCarrot, FaUtensils } from 'react-icons/fa';

const SearchBar = ({ onSearch, isLoading }) => {

    // Estado para manejar los ingredientes ingresados por el usuario
    const [ingredients, setIngredients] = useState('');

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario

        // Si los ingredientes no están vacíos, llama a la función onSearch
        if (ingredients.trim()) {  
            onSearch(ingredients);  // Llama a la función onSearch con los ingredientes
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <FaCarrot className="text-orange-500 mr-2" /> 
                Busca recetas con los ingredientes que tengas
            </h2>
            
            <form onSubmit={handleSubmit} className="flex max-w-3xl mx-auto flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUtensils className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="Ingresa ingredientes (ej: pollo, arroz, tomates)"
                        className="flex-1 pl-10 p-4 bg-gray-50 dark:bg-gray-700 text-base border border-gray-300 dark:border-gray-600 rounded-xl md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-transparent transition-all duration-300 w-full shadow-sm"
                        disabled={isLoading}
                    />
                </div>
                <button 
                    type="submit" 
                    className="button-primary md:rounded-l-none flex items-center justify-center gap-2 py-4 px-8 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Buscando...
                        </>
                    ) : (
                        <>
                            <FaSearch />
                            Buscar Recetas
                        </>
                    )}
                </button>
            </form>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-sm">
                <div className="flex items-start">
                    <div className="mr-2 mt-0.5">💡</div>
                    <div>
                        <p className="font-medium mb-1">Consejos:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Separa múltiples ingredientes con comas</li>
                            <li>Busca los ingredientes en inglés para mejores resultados (ejemplo: tomato, onion, garlic)</li>
                            <li>Sé específico con los ingredientes principales que quieres usar</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;  // Exporta el componente SearchBar
