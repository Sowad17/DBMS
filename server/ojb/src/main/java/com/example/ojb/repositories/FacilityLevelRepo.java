package com.example.ojb.repositories;

import com.example.ojb.dto.FacilityLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityLevelRepo extends JpaRepository<FacilityLevel, Integer> {
}
