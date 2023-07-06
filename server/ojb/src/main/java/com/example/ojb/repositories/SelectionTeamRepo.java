package com.example.ojb.repositories;

import com.example.ojb.dto.SelectionTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectionTeamRepo extends JpaRepository<SelectionTeam, Integer> {
}
