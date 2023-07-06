package com.example.ojb.repositories;
import com.example.ojb.dto.Publish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublishRepo extends JpaRepository<Publish, Integer> {
}
