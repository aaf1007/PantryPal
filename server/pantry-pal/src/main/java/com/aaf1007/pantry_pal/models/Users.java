package com.aaf1007.pantry_pal.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

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
    @UniqueElements
    @Column(nullable=false)
    private String email;

    // TODO: add Bcrypt password hash
    

    @CreationTimestamp
    private LocalDateTime createdAt; 
    
}
