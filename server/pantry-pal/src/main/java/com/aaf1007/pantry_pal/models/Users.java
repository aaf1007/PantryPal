package com.aaf1007.pantry_pal.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

@Entity
public class Users {
    @Id
    @GeneratedValue
    Long id;

    @Column(nullable=false)
    String fullName;

    @Email
    @Column(nullable=false)
    String email;
    
    @Column(nullable=false)
    Date dateOfBirth;

}
