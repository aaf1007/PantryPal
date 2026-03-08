package com.aaf1007.pantry_pal.services;

import org.springframework.stereotype.Service;

import com.aaf1007.pantry_pal.clients.GeminiClient;
import com.aaf1007.pantry_pal.dtos.RecipeRequest;
import com.aaf1007.pantry_pal.dtos.RecipeResponse;

import tools.jackson.databind.ObjectMapper;

@Service
public class RecipeService {
    // Service class handles business logic
    private final GeminiClient geminiClient;

    public RecipeService(GeminiClient geminiClient) {
      this.geminiClient = geminiClient;
    }
  
    public RecipeResponse generateRecipe(RecipeRequest request) {
      String prompt = """
        You are an expert chef and culinary instructor.
        Create ONE delicious, practical recipe using ONLY these ingredients: %s

        Rules:
        - Use only the provided ingredients (you may assume salt, pepper, water, and basic cooking oil are available)
        - Make the recipe realistic and achievable for a home cook
        - Each step should be clear, concise, and actionable
        - Specify quantities for each ingredient in the ingredients list
        - Estimated time should reflect total cook + prep time in minutes

        Respond ONLY with a valid JSON object. No markdown, no explanation, no extra text. Use exactly these keys:
        {
          "title": "string — creative recipe name",
          "ingredients": ["string — each item with quantity, e.g. '2 cloves garlic, minced'"],
          "steps": ["string — numbered, clear cooking instructions"],
          "estimatedTime": number (total minutes as integer)
        }
        """.formatted(request.getIngredients());
  
      String response = geminiClient.generateText(prompt);
      ObjectMapper objectMapper = new ObjectMapper();

      try {
        return objectMapper.readValue(response, RecipeResponse.class);
      } catch (Exception e) {
        throw new RuntimeException("Failed to parse Gemini response", e);
      }
    }
}
