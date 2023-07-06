package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "job")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "job_offering_company")
    private String job_offering_company;
    @Column(name = "job_location")
    private String job_location;
    @Column(name = "appointment")
    private Date appointment;
    @Column(name = "facility_grade")
    private char facility_grade;
    @Column(name = "experience_grade")
    private String experience_grade;
    @Column(name = "education")
    private String education;

    @Column(name = "course")
    private String course;

    @Column(name = "job_type")
    private String job_type;
    @Column(name = "age")
    private int age;

    public String toString() {
        return "Job ID: " + job_id + "\n" +
                "Job Offering Company: " + job_offering_company + "\n" +
                "Job Location: " + job_location + "\n" +
                "Appointment: " + appointment + "\n" +
                "Facility Grade: " + facility_grade + "\n" +
                "Experience Grade: " + experience_grade + "\n" +
                "Education: " + education + "\n" +
                "Course: " + course + "\n" +
                "Job Type: " + job_type + "\n" +
                "Age: " + age + "\n";
    }
}
