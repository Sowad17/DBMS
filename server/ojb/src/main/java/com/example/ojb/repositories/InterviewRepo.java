package com.example.ojb.repositories;

import com.example.ojb.dto.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewRepo extends JpaRepository<Interview, Integer> {
}
