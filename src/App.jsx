/**
 * Componente App: Componente principal de la aplicación de recetas
 *
 * Este componente coordina toda la funcionalidad principal de la aplicación:
 * - Gestión de búsqueda de recetas por ingredientes
 * - Filtrado de resultados por múltiples criterios
 * - Manejo de favoritos (guardar y recuperar)
 * - Cambio de tema claro/oscuro
 * - Manejo de estados de carga y errores
 * - Procesamiento de datos de recetas y nutrición
 *
 * La aplicación utiliza React Hooks para la gestión de estado y efectos secundarios,
 * e implementa una interfaz responsiva con soporte para temas claro y oscuro.
 */
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
    /**
     * GESTIÓN DE ESTADOS
     * La aplicación utiliza diversos estados para manejar diferentes aspectos de la funcionalidad
     */
    
    // Estado para almacenar las recetas obtenidas de la API o datos de respaldo
    // Este es el conjunto completo de recetas sin filtrar
    const [recipes, setRecipes] = useState([]);
    
    // Estado para almacenar las recetas después de aplicar filtros
    // Este conjunto es el que finalmente se muestra al usuario
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    
    // Estado que indica si hay una operación de búsqueda o carga en curso
    // Controla la visualización de indicadores de carga y deshabilita controles durante la búsqueda
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado para manejar y mostrar mensajes de error al usuario
    // Se establece cuando ocurre un problema con la API o el procesamiento de datos
    const [error, setError] = useState(null);
    
    // Estado para controlar el tema visual de la aplicación (claro u oscuro)
    // Afecta a las clases CSS aplicadas a través de Tailwind
    const [theme, setTheme] = useState('light');
    
    // Estado para manejar los criterios de filtrado seleccionados por el usuario
    // Cada propiedad corresponde a un tipo diferente de filtro aplicable a las recetas
    const [filters, setFilters] = useState({
        time: '',              // Tiempo máximo de preparación en minutos
        diet: '',              // Tipo de dieta (vegetariano, vegano, etc.)
        sort: '',              // Criterio de ordenación (tiempo, calorías)
        excludedIngredients: '', // Ingredientes que el usuario quiere excluir
        maxIngredients: ''     // Número máximo de ingredientes permitidos
    });
    
    // Estado para almacenar las recetas marcadas como favoritas por el usuario
    // Se persiste en localStorage para mantenerlas entre sesiones
    const [favorites, setFavorites] = useState([]);
    
    // Estado para controlar si se muestran solo las recetas favoritas
    // Funciona como un filtro adicional sobre los resultados
    const [showFavorites, setShowFavorites] = useState(false);

    /**
     * EFECTOS (useEffect)
     * Los efectos gestionan los comportamientos reactivos y efectos secundarios de la aplicación
     */

    /**
     * Efecto: Gestión del tema claro/oscuro
     * 
     * Este efecto se ejecuta cuando cambia el estado del tema y aplica los cambios
     * necesarios al DOM para activar el modo oscuro en la aplicación.
     * 
     * - Agrega/elimina la clase 'dark' al elemento HTML raíz para que Tailwind
     *   aplique los estilos correspondientes al tema seleccionado
     * - Mantiene compatibilidad con posible código antiguo mediante atributos data-*
     */
    useEffect(() => {
        // Aplica la clase 'dark' al HTML para activar las variantes dark: de Tailwind
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Mantiene la compatibilidad con código antiguo 
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]); // Solo se ejecuta cuando cambia el tema
    
    /**
     * Efecto: Cargar favoritos desde localStorage
     * 
     * Este efecto se ejecuta una sola vez al montar el componente y carga
     * las recetas favoritas guardadas previamente en el almacenamiento local.
     * Permite persistencia de favoritos entre sesiones de navegación.
     */
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoriteRecipes');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []); // Array de dependencias vacío indica que solo se ejecuta al montar el componente

    /**
     * Efecto: Sistema de filtrado de recetas
     * 
     * Este efecto aplica todos los filtros seleccionados por el usuario a las recetas.
     * Se ejecuta cada vez que cambia el conjunto de recetas o cualquiera de los filtros.
     * Implementa filtrado por tiempo, dieta, ingredientes excluidos, número de ingredientes,
     * y ordenamiento por diferentes criterios.
     */
    useEffect(() => {
        // Creamos una copia del array de recetas para no modificar el original
        let result = [...recipes];

        console.log('Aplicando filtros:', filters);

        // FILTRO 1: Filtrar por tiempo máximo de preparación
        if (filters.time) {
            result = result.filter(item => {
                // Solo incluye recetas cuyo tiempo de preparación sea menor o igual al filtro
                const timeMatch = item.recipe.totalTime > 0 && item.recipe.totalTime <= parseInt(filters.time);
                return timeMatch;
            });
        }

        // FILTRO 2: Filtrar por tipo de dieta (vegetariano, vegano, etc.)
        if (filters.diet) {
            console.log('Filtrando por dieta:', filters.diet);
            result = result.filter(item => {
                console.log('Comprobando receta:', item.recipe.label);
                console.log('Etiquetas:', item.recipe.healthLabels);
                // Comprueba si la receta tiene la etiqueta de dieta seleccionada
                const dietMatch = item.recipe.healthLabels.includes(filters.diet);
                console.log('¿Coincide?:', dietMatch);
                return dietMatch;
            });
        }

        // FILTRO 3: Excluir recetas que contengan ingredientes no deseados
        if (filters.excludedIngredients) {
            // Divide la cadena de ingredientes excluidos en un array y normaliza
            const excludedItems = filters.excludedIngredients.toLowerCase().split(',').map(item => item.trim());
            result = result.filter(item => {
                // Convierte todos los ingredientes de la receta a minúsculas para comparación sin distinguir mayúsculas
                const ingredientsLower = item.recipe.ingredientLines.map(ing => ing.toLowerCase());
                // Devuelve true si NINGÚN ingrediente excluido está presente en la receta
                return !excludedItems.some(excluded => 
                    ingredientsLower.some(ingredient => ingredient.includes(excluded))
                );
            });
        }

        // FILTRO 4: Filtrar por número máximo de ingredientes
        if (filters.maxIngredients) {
            const maxCount = parseInt(filters.maxIngredients);
            result = result.filter(item => {
                // Solo incluye recetas con menos ingredientes que el máximo especificado
                return item.recipe.ingredientLines.length <= maxCount;
            });
        }

        // ORDENACIÓN: Ordenar las recetas según criterio seleccionado
        if (filters.sort) {
            result.sort((a, b) => {
                if (filters.sort === 'time') {
                    // Ordena de menor a mayor tiempo de preparación
                    return (a.recipe.totalTime || 0) - (b.recipe.totalTime || 0);
                } else if (filters.sort === 'calories') {
                    // Ordena de menor a mayor número de calorías
                    return (a.recipe.calories || 0) - (b.recipe.calories || 0);
                }
                return 0;  // Sin cambios si no hay criterio válido
            });
        }

        // Actualiza el estado con las recetas filtradas
        setFilteredRecipes(result);
    }, [recipes, filters]); // Se ejecuta cuando cambian las recetas o los filtros

    /**
     * FUNCIONES AUXILIARES
     * Estas funciones implementan la lógica principal de la aplicación
     */

    /**
     * Alterna entre el tema claro y oscuro de la aplicación
     * 
     * Esta función cambia el estado del tema entre 'light' y 'dark'.
     * El efecto useEffect asociado al cambio de tema se encarga de aplicar
     * los cambios en el DOM (clases CSS y atributos data-theme).
     */
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    
    /**
     * Alterna el estado de favorito de una receta
     * 
     * @param {Object} recipe - Objeto de receta a marcar/desmarcar como favorita
     * 
     * Esta función:
     * 1. Identifica la receta por su URL o etiqueta (como identificador único)
     * 2. Agrega o elimina la receta del array de favoritos
     * 3. Actualiza el localStorage para persistir los cambios entre sesiones
     */
    const toggleFavorite = (recipe) => {
        const recipeId = recipe.url || recipe.label; // Identificador único de la receta
        
        setFavorites(prevFavorites => {
            let newFavorites;
            
            // Verificamos si la receta ya está en favoritos
            if (prevFavorites.some(fav => (fav.url || fav.label) === recipeId)) {
                // Si existe, la eliminamos filtrando el array
                newFavorites = prevFavorites.filter(fav => (fav.url || fav.label) !== recipeId);
            } else {
                // Si no existe, la añadimos al array
                newFavorites = [...prevFavorites, recipe];
            }
            
            // Persistimos los cambios en localStorage
            localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };
    
    /**
     * Verifica si una receta está marcada como favorita
     * 
     * @param {Object} recipe - Objeto de receta a verificar
     * @returns {boolean} - true si la receta está en favoritos, false en caso contrario
     */
    const isFavorite = (recipe) => {
        if (!recipe) return false; // Protección contra valores nulos o indefinidos
        
        const recipeId = recipe.url || recipe.label;
        return favorites.some(fav => (fav.url || fav.label) === recipeId);
    };
    
    /**
     * Alterna la visualización entre todas las recetas y solo las favoritas
     * 
     * Esta función cambia el estado showFavorites, que se utiliza para
     * filtrar las recetas mostradas en la interfaz de usuario.
     */
    const handleToggleFavorites = () => {
        setShowFavorites(prev => !prev);
    };

    /**
     * Actualiza los criterios de filtrado de recetas
     * 
     * @param {string} name - Nombre del filtro a actualizar (time, diet, etc.)
     * @param {string} value - Nuevo valor para el filtro
     * 
     * Esta función mantiene la inmutabilidad del estado mediante la creación
     * de un nuevo objeto con todos los filtros previos y la actualización
     * del filtro especificado. El efecto useEffect asociado se encarga de 
     * aplicar los nuevos filtros a las recetas.
     */
    const handleFilterChange = (name, value) => {
        console.log('Cambio de filtro:', name, value);
        setFilters(prev => ({
            ...prev,            // Mantiene los filtros existentes
            [name]: value      // Actualiza el filtro especificado (notación de propiedad computada)
        }));
    };

    /**
     * Obtiene información nutricional detallada de una receta desde la API
     * 
     * @param {string|number} id - Identificador de la receta en la API de Spoonacular
     * @returns {Object|null} - Objeto con información nutricional o null si hay error
     * 
     * Esta función hace una petición a la API de Spoonacular para obtener
     * datos nutricionales como calorías, proteínas, carbohidratos, grasas y fibra.
     * Incluye manejo de errores para evitar fallos en la aplicación cuando la API
     * no responde correctamente.
     */
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
            
            // Convertimos las cadenas a números para facilitar operaciones aritméticas
            return {
                calories: parseFloat(data.calories),
                protein: parseFloat(data.protein),
                carbs: parseFloat(data.carbs),
                fat: parseFloat(data.fat),
                fiber: parseFloat(data.fiber)
            };
        } catch (error) {
            console.error('Error al obtener información nutricional:', error);
            return null; // Devolvemos null para indicar que hubo un error
        }
    };
    
    /**
     * Filtra las recetas de respaldo (BACKUP_RECIPES) según los términos de búsqueda
     * 
     * @param {string} searchQuery - Términos de búsqueda separados por espacios o comas
     * @returns {Array} - Array de recetas filtradas que coinciden con la búsqueda
     * 
     * Esta función se utiliza cuando la API principal no está disponible o ha
     * alcanzado su límite de peticiones. Busca coincidencias tanto en el título
     * de la receta como en sus ingredientes.
     */
    const filterBackupRecipesByIngredients = (searchQuery) => {
        // Filtrando recetas de respaldo
        
        // Primero filtramos para eliminar recetas con imágenes problemáticas o inválidas
        const validRecipes = BACKUP_RECIPES.filter(item => {
            // Verificar si la receta y su imagen existen
            if (!item || !item.recipe || !item.recipe.image) {
                return false;
            }
            
            const imageUrl = item.recipe.image.toLowerCase();
            
            // Verificar si es una URL válida
            if (typeof imageUrl !== 'string' || 
                imageUrl.length < 10 || 
                !imageUrl.startsWith('https://')) {
                return false;
            }
            
            // Lista de patrones problemáticos conocidos en URLs de imágenes
            const problematicPatterns = [
                'no-disponible',
                'no-available',
                'not-available',
                'no-image',
                'missing-image',
                'placeholder',
                'default.jpg',
                'default.png',
                'undefined',
                'null'
            ];
            
            // Verificar si la URL contiene alguno de los patrones problemáticos
            for (const pattern of problematicPatterns) {
                if (imageUrl.includes(pattern)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Si no hay búsqueda, devolvemos todas las recetas de respaldo válidas
        if (!searchQuery || searchQuery.trim() === '') {
            return validRecipes;
        }
        
        // Procesamos los términos de búsqueda:
        // 1. Convertimos a minúsculas para búsqueda sin distinción de mayúsculas/minúsculas
        // 2. Dividimos por espacios o comas (regex: [\s,]+)
        // 3. Filtramos términos vacíos
        const searchTerms = searchQuery.toLowerCase().split(/[\s,]+/).filter(term => term.length > 0);
        console.log('Términos de búsqueda procesados:', searchTerms);
        
        // Aplicamos lógica de filtrado: una receta coincide si al menos uno de los términos
        // de búsqueda aparece en su título o en alguno de sus ingredientes
        return validRecipes.filter(recipeItem => {
            const recipe = recipeItem.recipe;
            
            // Comprobamos coincidencia en el título de la receta
            if (recipe.label && searchTerms.some(term => recipe.label.toLowerCase().includes(term))) {
                return true; // Coincidencia encontrada en el título
            }
            
            // Comprobamos coincidencia en los ingredientes de la receta
            if (recipe.ingredientLines && recipe.ingredientLines.some(ingredient => 
                searchTerms.some(term => ingredient.toLowerCase().includes(term))
            )) {
                return true; // Coincidencia encontrada en algún ingrediente
            }
            
            // Si no hay coincidencias ni en título ni en ingredientes, descartamos esta receta
            return false;
        });
    };

    /**
     * FUNCIÓN PRINCIPAL: Busca recetas basadas en los ingredientes proporcionados
     * 
     * @param {string} ingredients - Ingredientes separados por comas o espacios
     * 
     * Esta función es el núcleo de la aplicación y realiza las siguientes tareas:
     * 1. Configura estados iniciales (carga, error, filtros)
     * 2. Realiza la petición a la API de Spoonacular
     * 3. Maneja errores y situaciones de límite de API
     * 4. Procesa las recetas recibidas añadiendo información nutricional
     * 5. Actualiza los estados de la aplicación con los resultados
     */
    const searchRecipes = async (ingredients) => {
        console.log('Buscando recetas para:', ingredients);
        
        // Inicializamos los estados para una nueva búsqueda
        setIsLoading(true);                // Activar indicador de carga
        setError(null);                    // Limpiar errores anteriores
        setFilters({ time: '', diet: '', sort: '', excludedIngredients: '', maxIngredients: '' });  // Resetear filtros
        
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
            
            // Realizando petición a API
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${encodedIngredients}&addRecipeInformation=true&fillIngredients=true&apiKey=${API_KEY}&number=12`
            );
            
            if (!response.ok) {
                console.error('Respuesta de API no válida:', response.status, response.statusText);
                
                // Manejo específico para error 402 (Payment Required)
                if (response.status === 402) {
                    // Límite de API alcanzado, usando datos de respaldo
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

            
            // Verificamos si hay resultados
            if (!data.results || data.results.length === 0) {
                setError('No se encontraron recetas con estos ingredientes. ¡Intenta con otros!');
                setIsLoading(false);
                return;
            }
            
            // Filtrar recetas que tienen una URL de imagen válida
            const recipesWithImages = data.results.filter(recipe => {
                // Verificar si la receta y su imagen existen
                if (!recipe || !recipe.image) return false;
                
                const imageUrl = recipe.image.toLowerCase();
                
                // Verificar si es una URL válida
                if (typeof imageUrl !== 'string' || 
                    imageUrl.length < 10 || 
                    !imageUrl.startsWith('https://')) {
                    return false;
                }
                
                // Lista de patrones problemáticos conocidos en URLs de imágenes
                const problematicPatterns = [
                    'no-disponible',
                    'no-available',
                    'not-available',
                    'no-image',
                    'missing-image',
                    'placeholder',
                    'default.jpg',
                    'default.png',
                    'undefined',
                    'null'
                ];
                
                // Verificar si la URL contiene alguno de los patrones problemáticos
                for (const pattern of problematicPatterns) {
                    if (imageUrl.includes(pattern)) {
                        return false;
                    }
                }
                
                return true;
            });

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
                    
                    // Verificamos una última vez que la imagen sea válida antes de agregar la receta
                    const imageUrl = formattedRecipe.recipe.image.toLowerCase();
                    let imageValid = true;
                    
                    // Lista de patrones problemáticos
                    const problematicPatterns = [
                        'no-disponible',
                        'no-available',
                        'not-available',
                        'no-image',
                        'missing-image',
                        'placeholder',
                        'default.jpg',
                        'default.png',
                        'undefined',
                        'null'
                    ];
                    
                    // Verificar URL válida
                    if (!imageUrl || 
                        typeof imageUrl !== 'string' || 
                        imageUrl.length < 10 || 
                        !imageUrl.startsWith('https://')) {
                        imageValid = false;
                    }
                    
                    // Verificar patrones problemáticos
                    if (imageValid) {
                        for (const pattern of problematicPatterns) {
                            if (imageUrl.includes(pattern)) {
                                imageValid = false;
                                break;
                            }
                        }
                    }
                    
                    // Si la imagen es válida, agregamos la receta
                    if (imageValid) {
                        recipesWithNutrition.push(formattedRecipe);
                    }
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

    /**
     * RENDERIZADO DEL COMPONENTE
     * 
     * La estructura principal del JSX incluye:
     * 1. Contenedor principal con soporte para tema claro/oscuro
     * 2. Cabecera con logo, título y controles (favoritos, tema)
     * 3. Sección principal con la barra de búsqueda y filtros
     * 4. Visualización condicional de mensajes de error y estados de carga
     * 5. Visualización de recetas o mensajes informativos según el estado
     */
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 w-full p-5">
            {/* CABECERA DE LA APLICACIÓN */}
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
                {/* PANEL DE BÚSQUEDA Y FILTROS */}
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
                    {/* SearchBar: Componente para buscar recetas por ingredientes */}
                    <SearchBar onSearch={searchRecipes} isLoading={isLoading} />
                    {/* Filters: Componente para aplicar filtros adicionales a los resultados */}
                    <Filters onFilterChange={handleFilterChange} />
                </div>
                
                {/* MENSAJES DE ERROR: Visualización de errores con información contextual */}
                {error && (
                    <div className="mb-8 p-5 bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-xl shadow-lg animate-fade-in flex items-start">
                        <FaExclamationTriangle className="text-red-500 text-xl mr-3 mt-1" />
                        <div>
                            <h3 className="font-bold text-red-500 mb-1">Error en la búsqueda</h3>
                            <p className="text-gray-700 dark:text-gray-300">{error}</p>
                            {/* Mensaje adicional para errores relacionados con el límite de la API */}
                            {error.includes('límite diario') && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Estamos mostrando recetas de respaldo debido a limitaciones del API.</p>
                            )}
                        </div>
                    </div>
                )}
                
                {/* INDICADOR DE CARGA: Muestra esqueletos de carga durante la búsqueda */}
                {isLoading && <RecipeList isLoading={true} recipes={[]} />}
                
                {/* MENSAJES DE ESTADO VACÍO: Información contextual cuando no hay resultados */}
                {!isLoading && !error && (
                    (showFavorites && favorites.length === 0) ? (
                        /* Caso 1: Modo favoritos activado pero no hay recetas guardadas como favoritas */
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
                        /* Caso 2: Búsqueda sin resultados en modo normal */
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
                
                {/* LISTA DE RECETAS: Visualización condicional basada en el modo activo */}
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
            
            {/* PIE DE PÁGINA: Información sobre la aplicación y créditos */}
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
