package com.example.ojb.repositories;

import com.example.ojb.dto.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {
    Login findByEmail(String email);
    boolean existsByEmailAndPassword(String username, String password);
    boolean existsByEmail(String email);
}
