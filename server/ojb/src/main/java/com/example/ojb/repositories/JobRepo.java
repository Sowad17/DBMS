package com.example.ojb.repositories;

import com.example.ojb.dto.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job, Integer> {

    @Query("SELECT j FROM Job j JOIN Post p ON j.job_id = p.job_id WHERE p.company_id = (SELECT c.company_id FROM Company c WHERE c.email = :email)")
    List<Object> myJobs(@Param("email") String email);

    @Query("select max(j.job_id) from Job j")
    Integer getId();
}
