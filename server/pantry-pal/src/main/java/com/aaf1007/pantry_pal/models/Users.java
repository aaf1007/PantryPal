package com.aaf1007.pantry_pal.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank
    @Column(nullable=false)
    private String fullName;

    @NotBlank
    @Email
    @Column(unique=true, nullable=false)
    private String email;

    @NotBlank
    @Column(nullable=false)
    private String passwordHash;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Users() {
    }

    public Users(@NotBlank String fullName, @NotBlank @Email String email, @NotBlank String passwordHash) {
        this.fullName = fullName;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    } 
    
}
