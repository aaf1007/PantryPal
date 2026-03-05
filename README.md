# PantryPal

An AI-powered recipe generator that turns your available ingredients into structured recipes using the Google Gemini API.

## Features

- Submit a list of pantry ingredients and receive a generated recipe with title, ingredients, steps, and estimated cook time
- RESTful API with a clean layered architecture (Controller → Service → Client)
- Persistent user data via JPA with PostgreSQL in production and H2 for local development
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
│       └── App.tsx
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
  "ingredients": "chicken, garlic, lemon, rosemary"
}
```

**Response:** A plain-text recipe with title, ingredients list, steps, and estimated time.

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
