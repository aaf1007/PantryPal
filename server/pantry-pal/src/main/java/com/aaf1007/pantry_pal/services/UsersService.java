package com.aaf1007.pantry_pal.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.aaf1007.pantry_pal.config.JwtUtil;
import com.aaf1007.pantry_pal.dtos.AuthResponse;
import com.aaf1007.pantry_pal.dtos.LoginRequest;
import com.aaf1007.pantry_pal.dtos.RegisterRequest;
import com.aaf1007.pantry_pal.models.Users;
import com.aaf1007.pantry_pal.repositories.UsersRepository;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) throws ResponseStatusException {
        boolean isPresent = usersRepository.findByEmail(request.getEmail()).isPresent();

        if (isPresent) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken");
        }

        String password = passwordEncoder.encode(request.getPassword());
        Users user = new Users(request.getFullName(), request.getEmail(), password);

        usersRepository.save(user);

        String token = jwtUtil.generateToken(user.getId().toString());
            
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) throws ResponseStatusException {
        Optional<Users> userOptional = usersRepository.findByEmail(request.getEmail());
        
        if (!userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
        }

        Users user = userOptional.get();
        String hashedPassword = user.getPasswordHash();

        if (passwordEncoder.matches(request.getPassword(),hashedPassword )) {
            String token = jwtUtil.generateToken(user.getId().toString());
            return new AuthResponse(token);

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong Credentials");
        }
    }
}
