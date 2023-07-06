package com.example.ojb.controllers;

import com.example.ojb.dto.Company;
import com.example.ojb.dto.Job;
import com.example.ojb.dto.Post;
import com.example.ojb.dto.SearchAndApply;
import com.example.ojb.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/company")
public class CompanyController {
    private final LoginRepo loginRepo;
    private final JobSeekerRepo jobSeekerRepo;
    private final CompanyRepo companyRepo;
    private final JobRepo jobRepo;
    private final SearchAndApplyRepo searchAndApply;
    private final PostRepo postRepo;

    @Autowired
    public CompanyController(LoginRepo loginRepo,
                             JobSeekerRepo jobSeekerRepo,
                             CompanyRepo companyRepo,
                             JobRepo jobRepo,
                             SearchAndApplyRepo searchAndApply,
                             PostRepo postRepo) {
        this.loginRepo = loginRepo;
        this.jobSeekerRepo = jobSeekerRepo;
        this.companyRepo = companyRepo;
        this.jobRepo = jobRepo;
        this.searchAndApply = searchAndApply;
        this.postRepo = postRepo;
    }

    @PostMapping("/update-profile")
    public Object editProfile(@RequestBody Map<String, String> payload) {
        Company company = new Company();
        company.setCompany_name(payload.get("company_name"));
        company.setNet_worth(Double.valueOf(payload.get("net_worth")));
        company.setMobile_no(payload.get("mobile_no"));
        company.setEmail(payload.get("email"));
        company.setWebsite(payload.get("website"));
        company.setEstablished_year(Integer.valueOf(payload.get("established_year")));
        company.setCity(payload.get("city"));
        System.out.println(company.toString());
        try {
            return companyRepo.updateCompany(
                    company.getCompany_name(),
                    company.getCity(),
                    company.getEstablished_year(),
                    company.getMobile_no(),
                    company.getNet_worth(),
                    company.getWebsite(),
                    company.getEmail()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }

    @PostMapping("/get-profile")
    public Object getProfile(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
        try {
            if (companyRepo.existsByEmail(email)) {
                Company company = (Company) companyRepo.findByEmail(email);
                return company;
            } else {
                return ResponseEntity.badRequest().body("Wrong Credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Wrong Credentials");
        }
    }

    @PostMapping("/post-job")
    public Object postJob(@RequestBody Map<String, String> payload) {
        int age = Integer.parseInt(payload.get("age"));
        Date appointment = new Date();
        String course = payload.get("course");
        String education = payload.get("education");
        String experience_grade = payload.get("experience_grade");
        char facility_grade = payload.get("facility_grade").charAt(0);
        String job_location = payload.get("job_location");
        String job_offering_company = payload.get("job_offering_company");
        String job_type = payload.get("job_type");
        String email = payload.get("email");
        Job job = new Job();
        job.setAge(age);
        job.setAppointment(appointment);
        job.setCourse(course);
        job.setEducation(education);
        job.setExperience_grade(experience_grade);
        job.setFacility_grade(facility_grade);
        job.setJob_location(job_location);
        job.setJob_offering_company(job_offering_company);
        job.setJob_type(job_type);

        try {
            jobRepo.save(job);
            Integer company_id = companyRepo.findByEmail(email).getCompany_id();
            Integer job_id = jobRepo.getId();
            Post post = new Post();
            post.setJob_id(job_id);
            post.setCompany_id(company_id);
            postRepo.save(post);
            return ResponseEntity.ok().body("Job Posted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }

    @PostMapping("/get-jobs")
    public List<Job> getJobs(@RequestBody Map<String, String> payload) {
        List<Job> jobs = new ArrayList<>();
        try {
            jobs = jobRepo.findAll();
            return jobs;
        } catch (Exception e) {
            return jobs;
        }
    }

    @PostMapping("/my-jobs")
    public List<Job> myJobs(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null) {
            return null;
        }
        try {
            int company_id = companyRepo.findByEmail(email).getCompany_id();
            return postRepo.findByCompanyId(company_id);
        } catch (Exception e) {
            return null;
        }
    }
    @PostMapping("/get-applicants")
    public List<Object> getApplicants(@RequestBody Map<String, String> payload) {
        Integer job_id = Integer.valueOf(payload.get("job_id"));
        if (job_id == null) {
            return null;
        }
        try {
            List<SearchAndApply> list = searchAndApply.findAllByJobId(job_id);
            List<Object> jobSeekers = new ArrayList<>();
            for (SearchAndApply app : list) {
                jobSeekers.add(jobSeekerRepo.findById(app.getJs_id()));
            }
            return jobSeekers;
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/delete-job")
    public Object deleteJob(@RequestBody Map<String, String> payload) {
        Integer job_id = Integer.valueOf(payload.get("job_id"));
        if (job_id == null) {
            return null;
        }
        try {
            jobRepo.deleteById(job_id);
            return ResponseEntity.ok().body("Job Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }
    @PostMapping("/is-owner")
    public boolean isOwner(@RequestBody Map<String, String> payload) {
        Integer job_id = Integer.valueOf(payload.get("job_id"));
        String email = payload.get("email");
        if (job_id == null || email == null) {
            return false;
        }
        try {
            Integer company_id = companyRepo.findByEmail(email).getCompany_id();
            return postRepo.existsByCompanyIdAndJobId(company_id, job_id);
        } catch (Exception e) {
            return false;
        }
    }
}
