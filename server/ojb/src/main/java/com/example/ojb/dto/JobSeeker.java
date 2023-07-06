package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "job_seeker")
public class JobSeeker implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "js_id")
    private int js_id;
    @Column(name = "name")
    private String name;
    @Column(name = "dob")
    private Date dob;
    @Column(name = "gender")
    private String gender;
    @Column(name = "experience")
    private int experience;
    @Column(name = "courses")
    private String courses;
    @Column(name = "address")
    private String address;
    @Column(name = "mobile_no")
    private String mobile_no;
    @Column(name = "email")
    private String email;
    @Column(name = "education")
    private String education;
    @Column(name = "age")
    private int age;

    @Override
    public String toString() {
        return "JobSeeker{" +
                "js_id=" + js_id +
                ", name='" + name + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", experience=" + experience +
                ", courses='" + courses + '\'' +
                ", address='" + address + '\'' +
                ", mobile_no='" + mobile_no + '\'' +
                ", email='" + email + '\'' +
                ", education='" + education + '\'' +
                ", age=" + age +
                '}';
    }
}
