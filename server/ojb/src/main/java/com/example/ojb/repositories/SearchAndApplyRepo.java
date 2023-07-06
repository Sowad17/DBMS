package com.example.ojb.repositories;

import com.example.ojb.dto.SearchAndApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchAndApplyRepo extends JpaRepository<SearchAndApply, Integer> {

    @Query(value = "SELECT * FROM search_and_apply WHERE job_id = ?1", nativeQuery = true)
    List<SearchAndApply> findAllByJobId(Integer jobId);

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM SearchAndApply s WHERE s.js_id = ?1 AND s.job_id = ?2")
    boolean existsByJs_idAndJob_id(@Param("js_id") Integer js_id,@Param("job_id") Integer job_id);
}
