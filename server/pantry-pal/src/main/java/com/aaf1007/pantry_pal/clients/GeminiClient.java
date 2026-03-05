package com.aaf1007.pantry_pal.clients;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Component
public class GeminiClient {

  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Value("${gemini.apiKey}")
  private String apiKey;

  @Value("${gemini.model}")
  private String model;

  public GeminiClient(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public String generateText(String prompt) {
    String url =
      "https://generativelanguage.googleapis.com/v1beta/models/"
        + model
        + ":generateContent?key="
        + apiKey;

    // Request body shape Gemini expects
    Map<String, Object> body = Map.of(
      "contents", List.of(
        Map.of("parts", List.of(
          Map.of("text", prompt)
        ))
      )
    );

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

    ResponseEntity<String> response =
      restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

    String rawJson = response.getBody();
    if (rawJson == null) return "";

    // Extract the actual text so your frontend gets clean output
    try {
      JsonNode root = objectMapper.readTree(rawJson);
      // candidates[0].content.parts[0].text
      JsonNode textNode = root.path("candidates").path(0)
        .path("content").path("parts").path(0)
        .path("text");
      return textNode.isMissingNode() ? rawJson : textNode.asText();
    } catch (Exception e) {
      // If parsing fails, return raw JSON so you still see something useful
      return rawJson;
    }
  }
}