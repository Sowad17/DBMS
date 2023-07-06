package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "check_criteria")
public class CheckCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "team_id")
    private int team_id;
}
