package com.example.ojb.repositories;

import com.example.ojb.dto.CheckCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckCriteriaRepo extends JpaRepository<CheckCriteria, Integer> {
}
