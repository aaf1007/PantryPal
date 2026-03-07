package com.aaf1007.pantry_pal.dtos;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeResponse {
    private final String recipe;

    @JsonCreator
    public RecipeResponse(@JsonProperty("recipe")String recipe) {
    this.recipe = recipe;
    }

    public String getRecipe() {
    return recipe;
    }
    }