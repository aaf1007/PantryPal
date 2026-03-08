package com.aaf1007.pantry_pal.dtos;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeResponse {
    private final String title;
    private final List<String> ingredients;
    private final List<String> steps;
    private final int estimatedTime;

    @JsonCreator
    public RecipeResponse(@JsonProperty("title")String title, @JsonProperty("ingredients")List<String> ingredients, @JsonProperty("steps")List<String> steps, @JsonProperty("estimatedTime")int estimatedTime) {
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
        this.estimatedTime = estimatedTime;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public List<String> getSteps() {
        return steps;
    }

    public int getEstimatedTime() {
        return estimatedTime;
    }

    
}