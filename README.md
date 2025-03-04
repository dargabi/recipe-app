# Diagrama

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
