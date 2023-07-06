package com.example.ojb.repositories;

import com.example.ojb.dto.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface JobSeekerRepo extends JpaRepository<JobSeeker, Integer> {
    boolean existsByEmail(String username);
    Object findByEmail(String username);

    @Transactional
    @Modifying
    @Query("UPDATE JobSeeker j SET j.name=:name, j.gender=:gender, j.experience=:experience, j.courses=:courses, j.address=:address, j.mobile_no=:mobile_no, j.education=:education, j.age=:age WHERE j.email=:email")
    Object update(@Param("name") String name,
//                  @Param("dob") Date dob,
                  @Param("gender") String gender,
                  @Param("experience") int experience,
                  @Param("courses") String courses,
                  @Param("address") String address,
                  @Param("mobile_no") String mobile_no,
                  @Param("education") String education,
                  @Param("age") int age,
                  @Param("email") String email);
}
