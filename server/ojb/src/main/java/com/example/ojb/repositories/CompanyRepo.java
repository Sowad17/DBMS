package com.example.ojb.repositories;

import com.example.ojb.dto.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Integer> {
    boolean existsByEmail(String username);

    Company findByEmail(String username);

    @Modifying
    @Transactional
    @Query("UPDATE Company c SET c.company_name = :company_name, c.city = :city, c.established_year = :established_year, c.mobile_no = :mobile_no, c.net_worth = :net_worth, c.website = :website WHERE c.email = :email")
    Object updateCompany(@Param("company_name") String company_name,
                       @Param("city") String city,
                       @Param("established_year") Integer established_year,
                       @Param("mobile_no") String mobile_no,
                       @Param("net_worth") double net_worth,
                       @Param("website") String website,
                       @Param("email") String email
    );

//    @Query("SELECT c FROM Company c JOIN Login l WHERE l.email = :email")
//    Object findByEmailAndJoinWithLogin(String email);
}
