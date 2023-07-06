package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "company_id")
    private int company_id;
    @Column(name = "company_name")
    private String company_name;

    public String toString(){
        return "Post [id=" + id + ", " +
                "job_id=" + job_id + ", " +
                "company_id=" + company_id +
                ", company_name=" + company_name + "]";
    }
}
