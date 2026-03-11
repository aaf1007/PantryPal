package com.aaf1007.pantry_pal.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/search")
    public List<String> searchIngredients(@RequestParam("query") String query) {
        return ingredientService.getIngredients(query);
    }
}
