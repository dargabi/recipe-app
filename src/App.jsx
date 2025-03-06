import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Filters from './components/Filters';
import { FaStar, FaMoon, FaSun, FaSearch, FaExclamationTriangle, FaAppleAlt, FaInfo } from 'react-icons/fa';

// Datos de respaldo en caso de que la API de Spoonacular no esté disponible
const BACKUP_RECIPES = [
    {
        recipe: {
            label: "Pasta con Tomate y Albahaca",
            image: "https://spoonacular.com/recipeImages/654959-556x370.jpg",
            totalTime: 30,
            yield: 4,
            ingredientLines: [
                "400g de pasta (espaguetis o penne)",
                "4 tomates maduros",
                "2 dientes de ajo",
                "Un puñado de hojas de albahaca fresca",
                "3 cucharadas de aceite de oliva virgen extra",
                "Sal y pimienta al gusto",
                "50g de queso parmesano rallado"
            ],
            calories: 450,
            nutrition: {
                protein: 12,
                carbs: 65,
                fat: 15,
                fiber: 4
            },
            healthLabels: ["vegetariano"],
            dietLabels: ["saludable"],
            url: "https://www.recetasderechupete.com/espaguetis-al-pomodoro-receta-italiana-de-pasta-con-tomate/13495/"
        }
    },
    {
        recipe: {
            label: "Ensalada César",
            image: "https://spoonacular.com/recipeImages/654812-556x370.jpg",
            totalTime: 20,
            yield: 2,
            ingredientLines: [
                "1 lechuga romana",
                "100g de pollo a la plancha",
                "50g de queso parmesano",
                "Picatostes de pan",
                "2 cucharadas de salsa César",
                "1 cucharada de aceite de oliva",
                "Sal y pimienta al gusto"
            ],
            calories: 320,
            nutrition: {
                protein: 20,
                carbs: 15,
                fat: 22,
                fiber: 3
            },
            healthLabels: [],
            dietLabels: ["saludable"],
            url: "https://www.directoalpaladar.com/recetas-de-ensaladas/ensalada-cesar-receta-clasica"
        }
    },
    {
        recipe: {
            label: "Tortilla Española",
            image: "https://spoonacular.com/recipeImages/654854-556x370.jpg",
            totalTime: 40,
            yield: 4,
            ingredientLines: [
                "6 huevos",
                "2 patatas medianas",
                "1 cebolla",
                "Aceite de oliva virgen extra",
                "Sal al gusto"
            ],
            calories: 380,
            nutrition: {
                protein: 15,
                carbs: 25,
                fat: 25,
                fiber: 2
            },
            healthLabels: ["vegetariano", "sin-gluten"],
            dietLabels: [],
            url: "https://www.recetasderechupete.com/tortilla-de-patatas-con-o-sin-cebolla/1542/"
        }
    },
    {
        recipe: {
            label: "Guacamole Tradicional",
            image: "https://spoonacular.com/recipeImages/654905-556x370.jpg",
            totalTime: 15,
            yield: 4,
            ingredientLines: [
                "3 aguacates maduros",
                "1 tomate mediano",
                "1/2 cebolla",
                "1 chile jalapeño (opcional)",
                "Cilantro fresco al gusto",
                "Jugo de 1 limón",
                "Sal al gusto"
            ],
            calories: 230,
            nutrition: {
                protein: 3,
                carbs: 12,
                fat: 20,
                fiber: 8
            },
            healthLabels: ["vegetariano", "vegano", "sin-gluten", "sin-lacteos"],
            dietLabels: ["saludable"],
            url: "https://www.recetasgratis.net/receta-de-guacamole-mexicano-tradicional-59590.html"
        }
    },
    {
        recipe: {
            label: "Hummus de Garbanzos",
            image: "https://spoonacular.com/recipeImages/654889-556x370.jpg",
            totalTime: 10,
            yield: 6,
            ingredientLines: [
                "400g de garbanzos cocidos",
                "2 cucharadas de tahini",
                "Jugo de 1 limón",
                "2 dientes de ajo",
                "3 cucharadas de aceite de oliva",
                "1 cucharadita de comino molido",
                "Sal al gusto",
                "Pimentón para decorar"
            ],
            calories: 180,
            nutrition: {
                protein: 8,
                carbs: 20,
                fat: 9,
                fiber: 6
            },
            healthLabels: ["vegetariano", "vegano", "sin-gluten", "sin-lacteos"],
            dietLabels: ["saludable"],
            url: "https://www.recetasderechupete.com/hummus-de-garbanzos-receta-paso-a-paso/12333/"
        }
    },
    {
        recipe: {
            label: "Paella Valenciana",
            image: "https://spoonacular.com/recipeImages/654928-556x370.jpg",
            totalTime: 60,
            yield: 6,
            ingredientLines: [
                "400g de arroz bomba",
                "200g de pollo troceado",
                "200g de conejo troceado",
                "100g de judías verdes",
                "100g de garrofón (o habas)",
                "1 tomate grande",
                "1 pimiento rojo",
                "Azafrán",
                "1 cucharadita de pimentón dulce",
                "1 litro de caldo de pollo",
                "Aceite de oliva",
                "Sal al gusto"
            ],
            calories: 520,
            nutrition: {
                protein: 25,
                carbs: 60,
                fat: 18,
                fiber: 4
            },
            healthLabels: [],
            dietLabels: [],
            url: "https://www.recetasderechupete.com/paella-valenciana-tradicional/14197/"
        }
    }
];

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
        sort: '',
        excludedIngredients: '',
        maxIngredients: ''
    });
    
    // Estado para la animación de rotación del botón de cambio de tema
    const [isRotating, setIsRotating] = useState(false);
    
    // Estado para almacenar recetas favoritas
    const [favorites, setFavorites] = useState([]);
    
    // Estado para mostrar recetas favoritas
    const [showFavorites, setShowFavorites] = useState(false);

    // Cambiar el tema de la aplicación
    useEffect(() => {
        // Aplica la clase 'dark' al HTML para activar las variantes dark: de Tailwind
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Mantiene la compatibilidad con código antiguo
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    // Cargar favoritos desde localStorage al iniciar
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoriteRecipes');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

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

        // Filtrar por ingredientes excluidos
        if (filters.excludedIngredients) {
            const excludedItems = filters.excludedIngredients.toLowerCase().split(',').map(item => item.trim());
            result = result.filter(item => {
                // Verificar que ninguno de los ingredientes excluidos esté en la receta
                const ingredientsLower = item.recipe.ingredientLines.map(ing => ing.toLowerCase());
                return !excludedItems.some(excluded => 
                    ingredientsLower.some(ingredient => ingredient.includes(excluded))
                );
            });
        }

        // Filtrar por número máximo de ingredientes
        if (filters.maxIngredients) {
            const maxCount = parseInt(filters.maxIngredients);
            result = result.filter(item => {
                return item.recipe.ingredientLines.length <= maxCount;
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
    
    // Función para alternar una receta como favorita
    const toggleFavorite = (recipe) => {
        const recipeId = recipe.url || recipe.label;
        setFavorites(prevFavorites => {
            let newFavorites;
            // Si ya existe en favoritos, lo eliminamos
            if (prevFavorites.some(fav => (fav.url || fav.label) === recipeId)) {
                newFavorites = prevFavorites.filter(fav => (fav.url || fav.label) !== recipeId);
            } else {
                // Si no existe, lo añadimos
                newFavorites = [...prevFavorites, recipe];
            }
            // Guardar en localStorage
            localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };
    
    // Función para comprobar si una receta está en favoritos
    const isFavorite = (recipe) => {
        if (!recipe) return false;
        const recipeId = recipe.url || recipe.label;
        return favorites.some(fav => (fav.url || fav.label) === recipeId);
    };
    
    // Función para mostrar/ocultar favoritos
    const handleToggleFavorites = () => {
        setShowFavorites(prev => !prev);
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
            const API_KEY = "6367909ade22481a856d130bc551ef65";
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
    
    // Función para filtrar las recetas de respaldo según los ingredientes buscados
    const filterBackupRecipesByIngredients = (searchQuery) => {
        console.log('Filtrando recetas de respaldo para:', searchQuery);
        
        if (!searchQuery || searchQuery.trim() === '') {
            return BACKUP_RECIPES; // Si no hay búsqueda, devolvemos todas las recetas de respaldo
        }
        
        // Convertimos la búsqueda a minúsculas y separamos por espacios o comas
        const searchTerms = searchQuery.toLowerCase().split(/[\s,]+/).filter(term => term.length > 0);
        console.log('Términos de búsqueda:', searchTerms);
        
        // Filtramos las recetas que contienen al menos uno de los términos de búsqueda
        return BACKUP_RECIPES.filter(recipeItem => {
            const recipe = recipeItem.recipe;
            
            // Buscamos en el título
            if (recipe.label && searchTerms.some(term => recipe.label.toLowerCase().includes(term))) {
                return true;
            }
            
            // Buscamos en los ingredientes
            if (recipe.ingredientLines && recipe.ingredientLines.some(ingredient => 
                searchTerms.some(term => ingredient.toLowerCase().includes(term))
            )) {
                return true;
            }
            
            // No coincide con ningún término de búsqueda
            return false;
        });
    };

    // Función para buscar recetas basadas en los ingredientes
    const searchRecipes = async (ingredients) => {
        console.log('Buscando recetas para:', ingredients);
        setIsLoading(true);  // Muestra la carga de recetas
        setError(null);  // Resetea el error
        setFilters({ time: '', diet: '', sort: '', excludedIngredients: '', maxIngredients: '' });  // Resetea los filtros
        
        // Limpiamos anteriores resultados
        setRecipes([]);
        setFilteredRecipes([]);
        
        // Si no hay ingredientes, mostramos error
        if (!ingredients || ingredients.trim() === '') {
            setError('Por favor, introduce algún ingrediente para buscar recetas');
            setIsLoading(false);
            return;
        }
        
        const API_KEY = "6367909ade22481a856d130bc551ef65";
        
        try {
            // Codificamos los ingredientes para la URL
            const encodedIngredients = encodeURIComponent(ingredients);
            
            console.log('Realizando petición a API...');
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${encodedIngredients}&addRecipeInformation=true&fillIngredients=true&apiKey=${API_KEY}&number=12`
            );
            
            if (!response.ok) {
                console.error('Respuesta de API no válida:', response.status, response.statusText);
                
                // Manejo específico para error 402 (Payment Required)
                if (response.status === 402) {
                    console.log('Límite de API alcanzado, usando datos de respaldo...');
                    // Filtrar recetas de respaldo según los ingredientes buscados
                    const filteredBackupRecipes = filterBackupRecipesByIngredients(ingredients);
                    
                    if (filteredBackupRecipes.length > 0) {
                        setRecipes(filteredBackupRecipes);
                        setFilteredRecipes(filteredBackupRecipes);
                        setIsLoading(false);
                        return; // Salimos de la función con éxito usando los datos de respaldo
                    } else {
                        throw new Error('Se ha alcanzado el límite diario de peticiones a la API de Spoonacular y no se encontraron recetas de respaldo. Por favor, intenta de nuevo mañana o usa otra clave API.');
                    }
                } else {
                    throw new Error(`Error al obtener las recetas (${response.status}: ${response.statusText})`);
                }
            }
            
            const data = await response.json();
            console.log('Datos recibidos de API:', data);
            
            // Verificamos si hay resultados
            if (!data.results || data.results.length === 0) {
                setError('No se encontraron recetas con estos ingredientes. ¡Intenta con otros!');
                setIsLoading(false);
                return;
            }
            
            // Filtrar recetas que tienen una URL de imagen válida
            const recipesWithImages = data.results.filter(recipe => 
                recipe && recipe.image && recipe.image.startsWith('https://')
            );

            if (recipesWithImages.length === 0) {
                setError('No se encontraron recetas con imágenes disponibles. ¡Intenta con otros ingredientes!');
                setIsLoading(false);
                return;
            }

            // Crear array para almacenar todas las recetas con información nutricional
            const recipesWithNutrition = [];
            
            // Obtener información nutricional para cada receta
            for (const recipe of recipesWithImages) {
                try {
                    console.log('Procesando receta:', recipe.title, 'ID:', recipe.id);
                    
                    // Validamos que la receta tenga los campos necesarios
                    if (!recipe.title || !recipe.id) {
                        console.warn('Receta con datos incompletos, omitiendo:', recipe);
                        continue;
                    }
                    
                    // Obtenemos información nutricional (puede ser null si hay error)
                    const nutrition = await fetchNutritionInfo(recipe.id);
                    
                    // Creamos arrays de etiquetas para la receta
                    const healthLabels = [];
                    if (recipe.vegetarian) healthLabels.push('vegetariano');
                    if (recipe.vegan) healthLabels.push('vegano');
                    if (recipe.glutenFree) healthLabels.push('sin-gluten');
                    if (recipe.dairyFree) healthLabels.push('sin-lacteos');
                    
                    const dietLabels = [];
                    if (recipe.lowFodmap) dietLabels.push('bajo-fodmap');
                    if (recipe.veryHealthy) dietLabels.push('saludable');
                    if (recipe.ketogenic) dietLabels.push('keto');
                    
                    // Validamos los ingredientes
                    const ingredientLines = recipe.extendedIngredients && 
                                           Array.isArray(recipe.extendedIngredients) ? 
                                           recipe.extendedIngredients.map(ing => ing.original || ing.originalString || ing.name || 'Ingrediente') :
                                           ['Ingredientes no disponibles'];
                    
                    // Creamos el objeto de receta con el formato esperado por RecipeCard
                    const formattedRecipe = {
                        recipe: {
                            label: recipe.title,
                            image: recipe.image,
                            totalTime: recipe.readyInMinutes || 0,
                            yield: recipe.servings || 1,
                            ingredientLines: ingredientLines,
                            calories: nutrition ? nutrition.calories || 0 : 0,
                            nutrition: {
                                protein: nutrition ? nutrition.protein || 0 : 0,
                                carbs: nutrition ? nutrition.carbs || 0 : 0,
                                fat: nutrition ? nutrition.fat || 0 : 0,
                                fiber: nutrition ? nutrition.fiber || 0 : 0
                            },
                            healthLabels: healthLabels,
                            dietLabels: dietLabels,
                            url: recipe.sourceUrl || recipe.spoonacularSourceUrl || ''
                        }
                    };
                    
                    recipesWithNutrition.push(formattedRecipe);
                } catch (recipeError) {
                    console.error('Error procesando receta individual:', recipeError);
                    // Continuamos con la siguiente receta en caso de error
                }
            }

            // Verificamos si pudimos procesar alguna receta correctamente
            if (recipesWithNutrition.length === 0) {
                setError('Hubo un problema procesando las recetas. Por favor, intenta de nuevo.');
                setIsLoading(false);
                return;
            }

            console.log('Recetas procesadas correctamente:', recipesWithNutrition.length);
            setRecipes(recipesWithNutrition);
            setFilteredRecipes(recipesWithNutrition);
            
        } catch (err) {
            console.error('Error en búsqueda de recetas:', err);
            setError(err.message || 'Ha ocurrido un error al buscar recetas');
        } finally {
            setIsLoading(false);  // Finaliza la carga
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 w-full p-5">
            <header className="container mx-auto max-w-6xl mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaAppleAlt className="text-orange-500 mr-3 text-3xl animate-pulse-slow" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Recipe-App by Gabriel</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleToggleFavorites}
                            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${showFavorites 
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            <FaStar className={showFavorites ? 'text-white' : 'text-yellow-500'} />
                            {showFavorites ? 'Ver todas las recetas' : 'Ver favoritos'}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 hover:shadow-md"
                            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                        >
                            {theme === 'light' ? 
                                <FaMoon className="text-indigo-600" /> : 
                                <FaSun className="text-yellow-400" />}
                        </button>
                    </div>
                </div>
                
                <div className="text-center mb-8">
                    <p className="text-xl text-gray-600 dark:text-gray-300">Encuentra recetas basadas en los ingredientes que tienes</p>
                </div>
            </header>
            
            <main className="container mx-auto max-w-6xl">
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
                    {/* Barra de búsqueda */}
                    <SearchBar onSearch={searchRecipes} isLoading={isLoading} />
                    <Filters onFilterChange={handleFilterChange} />
                </div>
                
                {/* Mensajes de error o información */}
                {error && (
                    <div className="mb-8 p-5 bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-xl shadow-lg animate-fade-in flex items-start">
                        <FaExclamationTriangle className="text-red-500 text-xl mr-3 mt-1" />
                        <div>
                            <h3 className="font-bold text-red-500 mb-1">Error en la búsqueda</h3>
                            <p className="text-gray-700 dark:text-gray-300">{error}</p>
                            {error.includes('límite diario') && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Estamos mostrando recetas de respaldo debido a limitaciones del API.</p>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Mostrar estado de carga */}
                {isLoading && <RecipeList isLoading={true} recipes={[]} />}
                
                {/* Mensaje cuando no hay resultados */}
                {!isLoading && !error && (
                    (showFavorites && favorites.length === 0) ? (
                        <div className="mb-8 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in flex items-center justify-center">
                            <div className="text-center py-10">
                                <FaStar className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                                <p className="text-lg text-gray-600 dark:text-gray-400">No tienes recetas favoritas guardadas.</p>
                                <button 
                                    onClick={handleToggleFavorites}
                                    className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-300"
                                >
                                    Ver todas las recetas
                                </button>
                            </div>
                        </div>
                    ) : (
                        filteredRecipes.length === 0 && !showFavorites && (
                            <div className="mb-8 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in flex items-center justify-center">
                                <div className="text-center py-10">
                                    <FaSearch className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                                    <p className="text-lg text-gray-600 dark:text-gray-400">No se encontraron recetas para tu búsqueda.</p>
                                    <p className="mt-2 text-gray-500 dark:text-gray-500">Intenta con diferentes ingredientes o términos de búsqueda.</p>
                                </div>
                            </div>
                        )
                    )
                )}
                
                {/* Mostrar lista de recetas filtradas o favoritos */}
                {!isLoading && !error && (
                    showFavorites ? 
                        (favorites.length > 0 && 
                            <RecipeList 
                                recipes={favorites.map(recipe => ({ recipe }))}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                            />
                        ) : 
                        (filteredRecipes.length > 0 &&
                            <RecipeList 
                                recipes={filteredRecipes}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                            />
                        )
                )}
            </main>
            
            <footer className="container mx-auto max-w-6xl mt-12 mb-6 text-center p-6 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="flex items-center">
                        <FaAppleAlt className="text-orange-500 mr-2" />
                        <span>Desarrollado con la API de Recetas de Spoonacular</span>
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()} Recipe-App by Gabriel
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;  // Exporta el componente App
