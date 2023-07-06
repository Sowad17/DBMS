package com.example.ojb.repositories;
import com.example.ojb.dto.Job;
import com.example.ojb.dto.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Integer>{

    @Query("SELECT c FROM Post p join Company c WHERE p.job_id = :job_id AND c.company_id = p.company_id")
    Object company(@Param("job_id") Integer job_id);

    @Query("select j from Job j join Post p on j.job_id = p.job_id where p.company_id = :companyId")
    List<Job> findByCompanyId(int companyId);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END FROM Post p WHERE p.company_id = ?1 AND p.job_id = ?2")
    boolean existsByCompanyIdAndJobId(Integer companyId, Integer jobId);
}
