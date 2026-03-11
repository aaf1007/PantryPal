package com.aaf1007.pantry_pal.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aaf1007.pantry_pal.services.IngredientService;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {
    // First inject Ingredient Service
    private final IngredientService ingredientService;
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/search?query=")
    public List<String> searchIngredients(@RequestBody String ingredient) {
        return ingredientService.getIngredients(ingredient);
    }
}
