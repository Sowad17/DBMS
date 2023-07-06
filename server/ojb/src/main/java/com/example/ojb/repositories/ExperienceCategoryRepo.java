package com.example.ojb.repositories;

import com.example.ojb.dto.ExperienceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceCategoryRepo extends JpaRepository<ExperienceCategory, Integer> {
}
