// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {

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
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}  // Actualiza el estado de ingredientes
                    placeholder="Ingresa ingredientes (ej: pollo, arroz, tomates)"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Buscar Recetas
                </button>
            </form>

            <div className="search-tips">
              
                {/* Consejos para ingresar ingredientes */}
                <p>Consejo: Separa múltiples ingredientes con comas</p>
                <p>Consejo: Busca los ingredientes en inglés (ejemplo: tomato, onion, garlic)</p>
            </div>
        </div>
    );
};

export default SearchBar;  // Exporta el componente SearchBar
