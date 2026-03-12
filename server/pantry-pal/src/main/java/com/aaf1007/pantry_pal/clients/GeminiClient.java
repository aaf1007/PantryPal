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

  @Value("${gemini.apiKey:}")
  private String apiKey;

  @Value("${gemini.model:gemini-2.5-flash}")
  private String model;

  public GeminiClient(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public String generateText(String prompt) {
    if (apiKey == null || apiKey.isBlank()) {
      throw new IllegalStateException("GEMINI_API_KEY is not configured.");
    }

    // JS: const url = `https://.../${model}:generateContent?key=${apiKey}`
    String url =
      "https://generativelanguage.googleapis.com/v1beta/models/"
        + model
        + ":generateContent?key="
        + apiKey;

    // JS: const body = { contents: [{ parts: [{ text: prompt }] }] }
    // Map<String, Object> = JS object where keys are strings, values can be anything
    // Map.of() = { ... },  List.of() = [ ... ]
    Map<String, Object> body = Map.of(
      "contents", List.of(
        Map.of("parts", List.of(
          Map.of("text", prompt)
        ))
      )
    );

    // JS: headers: { 'Content-Type': 'application/json' }
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    // JS: the options object passed to fetch() — bundles body + headers together
    // e.g. fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

    // JS: const res = await fetch(url, { method: 'POST', ...entity })
    // String.class tells RestTemplate to return the response body as a raw String
    ResponseEntity<String> response =
      restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

    // JS: const rawJson = await res.text()
    String rawJson = response.getBody();
    if (rawJson == null) return "";

    // Extract the actual text so your frontend gets clean output
    try {
      // JS: const root = JSON.parse(rawJson)
      JsonNode root = objectMapper.readTree(rawJson);

      // JS: root?.candidates?.[0]?.content?.parts?.[0]?.text
      JsonNode textNode = root.path("candidates").path(0)
        .path("content").path("parts").path(0)
        .path("text");

      // JS: return textNode ?? rawJson  (fallback to raw JSON if path doesn't exist)
      return textNode.isMissingNode() ? rawJson : textNode.asText();
    } catch (Exception e) {
      // If parsing fails, return raw JSON so you still see something useful
      return rawJson;
    }
  }
}
