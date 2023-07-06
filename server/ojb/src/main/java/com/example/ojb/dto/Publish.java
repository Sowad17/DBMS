package com.example.ojb.dto;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "publish")
public class Publish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "js_id")
    private int js_id;
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "company_id")
    private int company_id;
    @Column(name = "team_id")
    private int team_id;
}
