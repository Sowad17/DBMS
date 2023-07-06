package com.example.ojb.controllers;


import com.example.ojb.dto.Job;
import com.example.ojb.dto.JobSeeker;
import com.example.ojb.dto.SearchAndApply;
import com.example.ojb.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {

    private final LoginRepo loginRepo;
    private final JobSeekerRepo jobSeekerRepo;
    private final CompanyRepo companyRepo;
    private final SearchAndApplyRepo searchAndApplyRepo;
    private final JobRepo jobRepo;
    private final PostRepo postRepo;

    @Autowired
    public JobSeekerController(LoginRepo loginRepo,
                               JobSeekerRepo jobSeekerRepo,
                               CompanyRepo companyRepo,
                               SearchAndApplyRepo searchAndApplyRepo,
                               JobRepo jobRepo,
                               PostRepo postRepo) {
        this.loginRepo = loginRepo;
        this.jobSeekerRepo = jobSeekerRepo;
        this.companyRepo = companyRepo;
        this.searchAndApplyRepo = searchAndApplyRepo;
        this.jobRepo = jobRepo;
        this.postRepo = postRepo;
    }

    @PostMapping("/get-profile")
    public Object getProfile(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid Request");
        }
        try {
            return jobSeekerRepo.findByEmail(email);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }

    @PostMapping("/update-profile")
    public Object updateProfile(@RequestBody Map<String, String> payload) {
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setName(payload.get("name"));
//        jobSeeker.setDob(new Date(payload.get("dob")));
        jobSeeker.setGender(payload.get("gender"));
        jobSeeker.setExperience(Integer.valueOf(payload.get("experience")));
        jobSeeker.setCourses(payload.get("courses"));
        jobSeeker.setAddress(payload.get("address"));
        jobSeeker.setMobile_no(payload.get("mobile_no"));
        jobSeeker.setEducation(payload.get("education"));
        jobSeeker.setAge(Integer.valueOf(payload.get("age")));
        jobSeeker.setEmail(payload.get("email"));

        try {
            return jobSeekerRepo.update(
                    jobSeeker.getName(),
//                    jobSeeker.getDob(),
                    jobSeeker.getGender(),
                    jobSeeker.getExperience(),
                    jobSeeker.getCourses(),
                    jobSeeker.getAddress(),
                    jobSeeker.getMobile_no(),
                    jobSeeker.getEducation(),
                    jobSeeker.getAge(),
                    jobSeeker.getEmail()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }
    @PostMapping("/apply")
    public Object apply(@RequestBody Map<String, String> payload){
        String job_id = payload.get("job_id");
        String js_id = payload.get("js_id");
        SearchAndApply searchAndApply = new SearchAndApply();
        searchAndApply.setJob_id(Integer.valueOf(job_id));
        searchAndApply.setJs_id(Integer.valueOf(js_id));
        try {
            if(searchAndApplyRepo.existsByJs_idAndJob_id(Integer.valueOf(js_id), Integer.valueOf(job_id))){
                return ResponseEntity.badRequest().body("Already Applied");
            }else{
                return searchAndApplyRepo.save(searchAndApply);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }
    @PostMapping("/get-applied-jobs")
    public List<Job> getAppliedJobs(@RequestBody Map<String, String> payload){
        String email = payload.get("email");
        if (email == null) {
            return null;
        }
        try {
            JobSeeker jobSeeker = (JobSeeker) jobSeekerRepo.findByEmail(email);
            List<SearchAndApply> searchAndApply = searchAndApplyRepo.findAll();
            System.out.println(searchAndApply.toString());
            List<Job> job = jobRepo.findAll() ;
            List<Job> jobs = new ArrayList<>();
            for(SearchAndApply s: searchAndApply){
                for(Job j: job){
                    if(s.getJob_id() == j.getJob_id()){
                        jobs.add(j);
                    }
                }
            }
            return jobs;
        } catch (Exception e) {
            return null;
        }
    }
    @PostMapping("/get-job")
    public Object getJob(@RequestBody Map<String, String> payload){
        String job_id = payload.get("job_id");
        if (job_id == null) {
            return null;
        }
        try {
//            return jobRepo.findById(Integer.valueOf(job_id));
            return postRepo.company(Integer.valueOf(job_id));
        } catch (Exception e) {
            return null;
        }
    }
}
