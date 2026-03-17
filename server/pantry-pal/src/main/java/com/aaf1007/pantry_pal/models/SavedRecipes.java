package com.aaf1007.pantry_pal.models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.aaf1007.pantry_pal.converters.StringListConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class SavedRecipes {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
    
    @NotBlank
    @Column(nullable=false)
    private String title;

    @NotNull
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "jsonb", nullable=false)
    private List<String> ingredients;

    @NotNull
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "jsonb", nullable=false)
    private List<String> steps;

    private int estimatedTime;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public SavedRecipes() {
    }

    public SavedRecipes(@NotNull Users user, @NotBlank String title, @NotNull List<String> ingredients,
            @NotNull List<String> steps, int estimatedTime) {
        this.user = user;
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
        this.estimatedTime = estimatedTime;
    }

    public UUID getId() {
        return id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public int getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(int estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
