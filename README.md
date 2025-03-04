```mermaid
graph TB
  User((User))

  subgraph "Recipe Application"
    subgraph "Frontend Container"
        WebApp["Web Application (React + Vite)"]
        
        subgraph "Core Components"
            AppComponent["App Component (React)"]
            MainComponent["Main Component (React)"]
        end
        
        subgraph "UI Components"
            SearchBar["SearchBar Component (React)"]
            RecipeList["RecipeList Component (React)"]
            RecipeCard["RecipeCard Component (React)"]
            Filters["Filters Component (React)"]
        end
        
        subgraph "State Management"
            ThemeState["Theme Manager (React useState)"]
            RecipeState["Recipe State (React useState)"]
            FilterState["Filter State (React useState)"]
        end
    end
  end

  subgraph "External Services"
    SpoonacularAPI["Spoonacular API (REST API)"]
  end

  %% User interactions
  User -->|"Interacts with"| WebApp

  %% Main component relationships
  WebApp -->|"Renders"| AppComponent
  AppComponent -->|"Renders"| MainComponent

  %% UI Component relationships
  MainComponent -->|"Renders"| SearchBar
  MainComponent -->|"Renders"| RecipeList
  MainComponent -->|"Renders"| Filters
  RecipeList -->|"Displays"| RecipeCard

  %% State management
  AppComponent -->|"Uses"| ThemeState
  AppComponent -->|"Uses"| RecipeState
  AppComponent -->|"Uses"| FilterState

  %% External API interactions
  AppComponent -->|"Triggers recipe fetch"| SpoonacularAPI
  AppComponent -->|"Triggers nutrition fetch"| SpoonacularAPI

  %% State to component relationships
  RecipeState -->|"Updates"| RecipeList
  FilterState -->|"Updates"| Filters
  ThemeState -->|"Updates"| AppComponent
```
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

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

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
