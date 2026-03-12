# PantryPal

An AI-powered recipe generator that turns your available ingredients into structured recipes using the Google Gemini API.

## Features

- Submit a list of pantry ingredients and receive a generated recipe with title, ingredients, steps, and estimated cook time
- RESTful API with a clean layered architecture (Controller → Service → Client)
- User entity and API placeholder in place via JPA with PostgreSQL in production and H2 for local development (persistence and recipe association not yet implemented)
- Ingredient search and autocomplete backed by the USDA API
- Input validation with Spring Validation

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 25 + Spring Boot 4.0.3 | Application framework |
| Spring MVC | REST API layer |
| Spring Data JPA | Data persistence |
| Spring Validation | Request validation |
| Google Gemini API | AI recipe generation |
| PostgreSQL | Production database |
| H2 | In-memory database for development |
| Maven | Build tool |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript 5.9 | UI framework |
| Vite 7 | Build tool and dev server |
| ESLint | Static analysis and linting |

## Project Structure

```
pantry-pal/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── App.tsx          # Routes and layout shell
│       ├── main.tsx         # React entry + router
│       ├── pages/           # Top-level pages (Home, Ingredients)
│       ├── components/      # Feature components (e.g. IngredientsCall)
│       └── layouts/         # Shared layouts (NavBar, CardNav, etc.)
└── server/
    └── pantry-pal/          # Spring Boot backend
        └── src/main/java/com/aaf1007/pantry_pal/
            ├── clients/     # External API integrations (Gemini)
            ├── config/      # Spring configuration
            ├── controllers/ # REST endpoints
            ├── dtos/        # Request/response objects
            ├── models/      # JPA entities
            └── services/    # Business logic
```

## API Reference

### Generate Recipe
```
POST /api/recipes/generate
Content-Type: application/json

{
  "ingredients": ["chicken", "garlic", "lemon", "rosemary"]
}
```

**Response:** Structured JSON with the generated recipe:

```json
{
  "title": "Lemon Garlic Roast Chicken",
  "ingredients": [
    "1 whole chicken",
    "4 cloves garlic, minced",
    "2 lemons, juiced",
    "2 tbsp olive oil",
    "1 tbsp fresh rosemary, chopped"
  ],
  "steps": [
    "Preheat oven to 400°F (200°C).",
    "Pat the chicken dry and place in a roasting pan.",
    "Whisk together lemon juice, garlic, olive oil, rosemary, salt, and pepper.",
    "Brush the mixture over the chicken and roast until cooked through."
  ],
  "estimatedTime": 60
}
```

Fields map directly to the `RecipeResponse` DTO:
- `title`: recipe title
- `ingredients`: array of ingredient lines including quantities
- `steps`: array of step-by-step instructions
- `estimatedTime`: total estimated cook time in minutes

### Search Ingredients

```
GET /api/ingredients/search?query=chicken
```

Returns a JSON array of ingredient suggestions (backed by the USDA API):

```json
[
  "Chicken, broilers or fryers, breast, meat only, raw",
  "Chicken, broilers or fryers, thigh, meat only, raw",
  "Chicken, broilers or fryers, drumstick, meat only, raw"
]
```

## Getting Started

### Prerequisites
- Java 25+
- Node.js 20+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Backend

1. Set your environment variables or populate `application.properties`:
   ```
   gemini.apiKey=YOUR_API_KEY
   gemini.model=gemini-1.5-flash
   # Optional: required if you use the ingredient search endpoint
   usda.apiKey=YOUR_USDA_API_KEY
   ```

2. Run the server:
   ```bash
   cd server/pantry-pal
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`.

### Frontend

```bash
cd client
npm install
npm run dev
```

The dev server will start at `http://localhost:5173`.

## What's Next

- **User accounts and saved recipes**
  - Backend: Implement authentication (e.g. Spring Security), user registration/login endpoints, and a `User` ↔ saved recipe relationship so users can persist recipes to their account.
  - Frontend: Add a \"Save recipe\" action on generated recipes and a \"My recipes\" page that lists and opens a user's saved recipes.

- **Popular recipes**
  - Backend: Track recipe saves or generation counts and expose an endpoint such as `GET /api/recipes/popular` that returns the most popular recipes or summaries.
  - Frontend: Add a \"Popular recipes\" section (for example on the home page) that showcases these recipes to new and returning users.

- **Future enhancements**
  - Support dietary preferences and restrictions (e.g. vegetarian, gluten-free).
  - Generate shopping lists from selected recipes.
