package com.aaf1007.pantry_pal.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aaf1007.pantry_pal.dtos.RecipeRequest;
import com.aaf1007.pantry_pal.services.RecipeService;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;
    // Constructor Injection
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody RecipeRequest request) {
        return recipeService.generateRecipe(request);
    }
}
