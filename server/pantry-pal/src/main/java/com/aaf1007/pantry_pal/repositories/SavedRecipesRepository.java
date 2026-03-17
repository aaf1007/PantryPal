package com.aaf1007.pantry_pal.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aaf1007.pantry_pal.models.SavedRecipes;
import com.aaf1007.pantry_pal.models.Users;

@Repository
public interface SavedRecipesRepository extends JpaRepository<SavedRecipes, UUID> {

    public List<SavedRecipes> findAllByUser(Users user);
}
