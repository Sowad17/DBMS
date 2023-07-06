package com.example.ojb.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ojb.dto.HiresUsing;

@Repository
public interface HireUsingRepo extends JpaRepository<HiresUsing, Integer>{
}
