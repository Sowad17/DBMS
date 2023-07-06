package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "hires_using")
public class HiresUsing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "team_id")
    private int team_id;
    @Column(name = "company_id")
    private int company_id;
    @Column(name = "team_name")
    private String team_name;
    @Column(name = "company_name")
    private String company_name;
}
