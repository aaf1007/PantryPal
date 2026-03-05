package com.aaf1007.pantry_pal.dtos;

import java.util.List;

// Used when enpoints expects JSON input from frontend
public class RecipeRequest {
    private List<String> ingredients;

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
