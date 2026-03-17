package com.aaf1007.pantry_pal.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aaf1007.pantry_pal.dtos.AuthResponse;
import com.aaf1007.pantry_pal.dtos.LoginRequest;
import com.aaf1007.pantry_pal.dtos.RegisterRequest;
import com.aaf1007.pantry_pal.services.UsersService;

@RestController
@RequestMapping("/api/auth")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return usersService.register(request);
    }
    
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return usersService.login(request);
    }
    
}
