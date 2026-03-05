package com.aaf1007.pantry_pal.services;

import org.springframework.stereotype.Service;

import com.aaf1007.pantry_pal.clients.GeminiClient;
import com.aaf1007.pantry_pal.dtos.RecipeRequest;

@Service
public class RecipeService {
    // Service class handles business logic
    private final GeminiClient geminiClient;

    public RecipeService(GeminiClient geminiClient) {
      this.geminiClient = geminiClient;
    }
  
    public String generateRecipe(RecipeRequest request) {
      String prompt = """
        You are a helpful cooking assistant.
        Create ONE recipe using ONLY these ingredients: %s
  
        Output format:
        Title:
        Ingredients:
        Steps:
        Estimated time:
        """.formatted(request.getIngredients());
  
      return geminiClient.generateText(prompt);
    }
}
