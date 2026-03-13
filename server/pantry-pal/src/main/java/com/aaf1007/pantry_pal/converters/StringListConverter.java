package com.aaf1007.pantry_pal.converters;

import java.util.List;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.type.CollectionType;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper mapper = new ObjectMapper();

    /** Serializes List<String> → JSON string before writing to DB */
    @Override
    public String convertToDatabaseColumn(List<String> list) {
        if (list == null) return null;
        try {
            return mapper.writeValueAsString(list);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize list to JSON", e);
        }
    }

    /** Deserializes JSON string → List<String> after reading from DB */
    @Override
    public List<String> convertToEntityAttribute(String json) {
        if (json == null) return null;
        try {
            CollectionType type = mapper.getTypeFactory()
                .constructCollectionType(List.class, String.class);
            return mapper.readValue(json, type);
        } catch (Exception e) {
            throw new RuntimeException("Failed to deserialize JSON to list", e);
        }
    }
}