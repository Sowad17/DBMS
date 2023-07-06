package com.example.ojb.controllers;

import com.example.ojb.dto.Company;
import com.example.ojb.dto.JobSeeker;
import com.example.ojb.dto.Login;
import com.example.ojb.repositories.CompanyRepo;
import com.example.ojb.repositories.JobSeekerRepo;
import com.example.ojb.repositories.LoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final LoginRepo loginRepo;
    private final JobSeekerRepo jobSeekerRepo;
    private final CompanyRepo companyRepo;

    @Autowired
    public AuthController(LoginRepo loginRepo,
                          JobSeekerRepo jobSeekerRepo,
                          CompanyRepo companyRepo) {
        this.loginRepo = loginRepo;
        this.jobSeekerRepo = jobSeekerRepo;
        this.companyRepo = companyRepo;
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
        try {
            if (loginRepo.existsByEmailAndPassword(email, password)) {
                Login login = loginRepo.findByEmail(email);
                login.setPassword(null);
                return login;
            } else {
                return ResponseEntity.badRequest().body("Wrong Credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Wrong Credentials");
        }
    }

    @PostMapping("/register")
    public Object register(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        String role = payload.get("role").toLowerCase();
        if (email == null || password == null || role == null) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
        try {
            if (loginRepo.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("Account already exists");
            } else {
                loginRepo.save(new Login(email, password, role));
                if (role.equalsIgnoreCase("jobseeker")) {
                    JobSeeker jobSeeker = new JobSeeker();
                    jobSeeker.setEmail(email);
                    return jobSeekerRepo.save(jobSeeker);
                } else if (role.equalsIgnoreCase("company")) {
                    Company company = new Company();
                    company.setEmail(email);
                    return companyRepo.save(company);
                } else {
                    return ResponseEntity.badRequest().body("Invalid Request");
                }
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
    }
}
//if(role.equals("jobseeker"))
//
//    {
//        JobSeeker jobSeeker = new JobSeeker();
//        jobSeeker.setName(payload.get("name"));
//        jobSeeker.setDob(new Date(payload.get("dob")));
//        jobSeeker.setGender(payload.get("gender"));
//        jobSeeker.setExperience(Integer.valueOf(payload.get("experience")));
//        jobSeeker.setCourses(payload.get("courses"));
//        jobSeeker.setAddress(payload.get("address"));
//        jobSeeker.setMobile_no(payload.get("mobile_no"));
//        jobSeeker.setEmail(email);
//        jobSeeker.setEducation(payload.get("education"));
//        jobSeeker.setAge(Integer.valueOf(payload.get("age")));
//        return jobSeekerRepo.save(jobSeeker);
//
//    } else if(role.equals("company"))
//
//    {
//        Company company = new Company();
//        company.setCompany_name(payload.get("company_name"));
//        company.setNet_worth(Double.valueOf(payload.get("net_worth")));
//        company.setMobile_no(payload.get("mobile_no"));
//        company.setEmail(email);
//        company.setWebsite(payload.get("website"));
//        company.setEstablished_year(Integer.valueOf(payload.get("established_year")));
//        company.setCity(payload.get("city"));
//        return companyRepo.save(company);
//    }
//}else{
//        return ResponseEntity.badRequest().body("Account already exists");
//        }