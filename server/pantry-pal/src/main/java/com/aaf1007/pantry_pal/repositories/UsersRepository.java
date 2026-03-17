package com.aaf1007.pantry_pal.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aaf1007.pantry_pal.models.Users;


@Repository
public interface UsersRepository extends JpaRepository<Users, UUID> {
    public Optional<Users> findByEmail(String email);
}
