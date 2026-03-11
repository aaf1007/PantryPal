package com.aaf1007.pantry_pal.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class IngredientService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${usda.apiKey}")
    private String apiKey;

    public IngredientService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<String> getIngredients(String ingredient) {
        String url =
            "https://api.nal.usda.gov/fdc/v1/foods/search?query="
            + ingredient
            + "&pageSize=5&api_key="
            + apiKey;
        
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String rawJson = response.getBody();

        if (rawJson == null || rawJson.isBlank()) {
            return List.of();
        }

        try {
            JsonNode root = objectMapper.readTree(rawJson);
            JsonNode foods = root.path("foods");
            List<String> results = new ArrayList<>();
            for (JsonNode food : foods) {
                results.add(food.path("description").asText());
            }
            return results;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse USDA response", e);
        }
    }
}
