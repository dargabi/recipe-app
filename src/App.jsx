import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Filters from './components/Filters';
import './App.css';

function App() {
    // Estado para almacenar las recetas obtenidas
    const [recipes, setRecipes] = useState([]);
    
    // Estado para almacenar las recetas filtradas
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    
    // Estado de carga mientras se obtienen las recetas
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado para manejar posibles errores
    const [error, setError] = useState(null);
    
    // Estado para manejar el tema (claro u oscuro)
    const [theme, setTheme] = useState('light');
    
    // Estado para manejar los filtros seleccionados
    const [filters, setFilters] = useState({
        time: '',
        diet: '',
        sort: ''
    });
    
    // Estado para la animación de rotación del botón de cambio de tema
    const [isRotating, setIsRotating] = useState(false);

    // Cambiar el tema de la aplicación
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);  // Aplica el tema al documento
    }, [theme]);

    // Aplicar los filtros a las recetas cuando cambian las recetas o los filtros
    useEffect(() => {
        let result = [...recipes];  // Copia de las recetas

        console.log('Aplicando filtros:', filters);

        // Filtrar por tiempo
        if (filters.time) {
            result = result.filter(item => {
                const timeMatch = item.recipe.totalTime > 0 && item.recipe.totalTime <= parseInt(filters.time);
                return timeMatch;  // Retorna las recetas que coinciden con el tiempo
            });
        }

        // Filtrar por dieta
        if (filters.diet) {
            console.log('Filtrando por dieta:', filters.diet);
            result = result.filter(item => {
                console.log('Comprobando receta:', item.recipe.label);
                console.log('Etiquetas:', item.recipe.healthLabels);
                const dietMatch = item.recipe.healthLabels.includes(filters.diet);
                console.log('¿Coincide?:', dietMatch);
                return dietMatch;  // Retorna las recetas que coinciden con la dieta
            });
        }

        // Ordenar las recetas
        if (filters.sort) {
            result.sort((a, b) => {
                if (filters.sort === 'time') {
                    return (a.recipe.totalTime || 0) - (b.recipe.totalTime || 0);
                } else if (filters.sort === 'calories') {
                    return (a.recipe.calories || 0) - (b.recipe.calories || 0);
                }
                return 0;  // Si no se selecciona un criterio de ordenación, no hace nada
            });
        }

        // Establecer las recetas filtradas
        setFilteredRecipes(result);
    }, [recipes, filters]);

    // Función para alternar entre el tema claro y oscuro
    const toggleTheme = () => {
        setIsRotating(true);  // Inicia la rotación
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');  // Cambia el tema
        setTimeout(() => setIsRotating(false), 500);  // Detiene la rotación después de medio segundo
    };

    // Función para manejar los cambios en los filtros
    const handleFilterChange = (name, value) => {
        console.log('Cambio de filtro:', name, value);
        setFilters(prev => ({
            ...prev,
            [name]: value  // Actualiza el filtro con el nuevo valor
        }));
    };

    // Función para obtener la información nutricional de una receta
    const fetchNutritionInfo = async (id) => {
        try {
            const API_KEY = "998b5c5c67e1450581aca695e5c350ff";
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener información nutricional');
            }
            
            const data = await response.json();
            return {
                calories: parseFloat(data.calories),
                protein: parseFloat(data.protein),
                carbs: parseFloat(data.carbs),
                fat: parseFloat(data.fat),
                fiber: parseFloat(data.fiber)
            };
        } catch (error) {
            console.error('Error al obtener información nutricional:', error);
            return null;
        }
    };

    // Función para buscar recetas basadas en los ingredientes
    const searchRecipes = async (ingredients) => {
        setIsLoading(true);  // Muestra la carga de recetas
        setError(null);  // Resetea el error
        setFilters({ time: '', diet: '', sort: '' });  // Resetea los filtros
        
        const API_KEY = "998b5c5c67e1450581aca695e5c350ff";
        
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&addRecipeInformation=true&fillIngredients=true&apiKey=${API_KEY}&number=12`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener las recetas');
            }
            
            const data = await response.json();
            
            if (data.results.length === 0) {
                setError('No se encontraron recetas con estos ingredientes. ¡Intenta con otros!');
                setRecipes([]);
                setFilteredRecipes([]);
            } else {
                // Filtrar recetas que tienen una URL de imagen válida
                const recipesWithImages = data.results.filter(recipe => 
                    recipe.image && recipe.image.startsWith('https://')
                );

                if (recipesWithImages.length === 0) {
                    setError('No se encontraron recetas con imágenes disponibles. ¡Intenta con otros ingredientes!');
                    setRecipes([]);
                    setFilteredRecipes([]);
                    return;
                }

                // Obtener información nutricional para cada receta
                const recipesWithNutrition = await Promise.all(
                    recipesWithImages.map(async (recipe) => {
                        const nutrition = await fetchNutritionInfo(recipe.id);
                        console.log('Información nutricional obtenida:', nutrition);

                        const healthLabels = [];
                        if (recipe.vegetarian) healthLabels.push('vegetariano');
                        if (recipe.vegan) healthLabels.push('vegano');
                        if (recipe.glutenFree) healthLabels.push('sin-gluten');
                        if (recipe.dairyFree) healthLabels.push('sin-lacteos');

                        return {
                            recipe: {
                                label: recipe.title,
                                image: recipe.image,
                                totalTime: recipe.readyInMinutes,
                                yield: recipe.servings,
                                ingredientLines: recipe.extendedIngredients.map(ing => ing.original),
                                calories: nutrition ? nutrition.calories : 0,
                                nutrition: {
                                    protein: nutrition ? nutrition.protein : 0,
                                    carbs: nutrition ? nutrition.carbs : 0,
                                    fat: nutrition ? nutrition.fat : 0,
                                    fiber: nutrition ? nutrition.fiber : 0
                                },
                                healthLabels: healthLabels,
                                dietLabels: [
                                    ...(recipe.lowFodmap ? ['bajo-fodmap'] : []),
                                    ...(recipe.veryHealthy ? ['saludable'] : []),
                                    ...(recipe.ketogenic ? ['keto'] : []),
                                ],
                                url: recipe.sourceUrl || recipe.spoonacularSourceUrl
                            }
                        };
                    })
                );

                setRecipes(recipesWithNutrition);
                setFilteredRecipes(recipesWithNutrition);
            }
        } catch (err) {
            setError(err.message);
            setRecipes([]);
            setFilteredRecipes([]);
        } finally {
            setIsLoading(false);  // Finaliza la carga
        }
    };

    return (
        <div className="app">
            {/* Botón para alternar entre tema claro y oscuro */}
            <button 
                className={`theme-toggle ${isRotating ? 'rotating' : ''}`} 
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <header className="app-header">
                <h1>Recipe-App by Gabriel</h1>
                <p>Encuentra recetas basadas en los ingredientes que tienes</p>
            </header>
            
            <main className="app-main">
                {/* Barra de búsqueda */}
                <SearchBar onSearch={searchRecipes} />
                <Filters onFilterChange={handleFilterChange} />
                
                {/* Mostrar estado de carga */}
                {isLoading && <div className="loading">Cargando recetas...</div>}
                
                {/* Mostrar error si ocurre */}
                {error && <div className="error">{error}</div>}
                
                {/* Mostrar lista de recetas filtradas */}
                {!isLoading && !error && <RecipeList recipes={filteredRecipes} />}
            </main>
            
            <footer className="app-footer">
                <p>Desarrollado con la API de Recetas de Spoonacular</p>
            </footer>
        </div>
    );
}

export default App;  // Exporta el componente App
