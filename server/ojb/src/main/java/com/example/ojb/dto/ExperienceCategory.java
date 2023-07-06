package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "experience_category")
public class ExperienceCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "year")
    private int year;
}
