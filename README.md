## Info
- **Aplicacion realizada conjuntamente con diferentes modelos de IA**

---

## GitHub Pages
- **https://dargabi.github.io/recipe-app/**

---

## Uso

1. **Ingresa los ingredientes** que tienes disponibles en la barra de búsqueda.
2. **Filtra las recetas** por tiempo de preparación, tipo de dieta, o por orden de calorías.
3. **Haz clic en una receta** para ver más detalles, incluyendo la información nutricional.

---

## Componentes Principales

- **AppComponent**: Componente principal que maneja el estado global de la aplicación.
- **MainComponent**: Componente que contiene los componentes de la interfaz de usuario.
- **SearchBar**: Componente para buscar recetas por ingredientes.
- **RecipeList**: Componente que muestra la lista de recetas.
- **RecipeCard**: Componente que muestra la información de una receta individual.
- **Filters**: Componente para aplicar filtros a las recetas.
- **ThemeState**: Estado para manejar el tema (claro/oscuro).
- **RecipeState**: Estado para manejar las recetas obtenidas.
- **FilterState**: Estado para manejar los filtros aplicados.

---

## API

La aplicación utiliza la **API de Spoonacular** para obtener información sobre las recetas y su información nutricional.

---

## Instalación
Para instalar y ejecutar la aplicación localmente, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/recipe-app.git
   cd recipe-app
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia la aplicación**:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## Diagrama


```mermaid
graph TB
    User((User))

    subgraph "Frontend Application"
        subgraph "Core Container"
            App["App Container<br>(React)"]
            
            subgraph "Component Layer"
                SearchBar["SearchBar Component<br>(React)"]
                RecipeList["RecipeList Component<br>(React)"]
                Filters["Filters Component<br>(React)"]
                RecipeCard["RecipeCard Component<br>(React)"]
                ThemeManager["Theme Manager<br>(React + TailwindCSS)"]
                FavoriteManager["Favorite Manager<br>(React + LocalStorage)"]
            end
            
            subgraph "State Management"
                RecipeState["Recipe State<br>(React Hooks)"]
                FilterState["Filter State<br>(React Hooks)"]
                ThemeState["Theme State<br>(React Hooks)"]
                LoadingState["Loading State<br>(React Hooks)"]
                ErrorState["Error State<br>(React Hooks)"]
            end
        end

        subgraph "Build System"
            Vite["Build Tool<br>(Vite)"]
            TailwindCSS["CSS Framework<br>(TailwindCSS)"]
        end
    end

    subgraph "External Services"
        SpoonacularAPI["Recipe API<br>(Spoonacular)"]
        LocalStorage["Browser Storage<br>(LocalStorage)"]
    end

    %% User interactions
    User -->|"Interacts with"| App
    
    %% Core container relationships
    App -->|"Manages"| RecipeState
    App -->|"Manages"| FilterState
    App -->|"Manages"| ThemeState
    App -->|"Manages"| LoadingState
    App -->|"Manages"| ErrorState

    %% Component relationships
    App -->|"Renders"| SearchBar
    App -->|"Renders"| RecipeList
    App -->|"Renders"| Filters
    RecipeList -->|"Renders"| RecipeCard
    App -->|"Uses"| ThemeManager
    App -->|"Uses"| FavoriteManager

    %% State relationships
    SearchBar -->|"Updates"| RecipeState
    Filters -->|"Updates"| FilterState
    ThemeManager -->|"Updates"| ThemeState
    RecipeCard -->|"Reads"| RecipeState
    
    %% External service interactions
    App -->|"Fetches data"| SpoonacularAPI
    FavoriteManager -->|"Persists favorites"| LocalStorage
    
    %% Build system relationships
    Vite -->|"Builds"| App
    TailwindCSS -->|"Styles"| App
```
---
