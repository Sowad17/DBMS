package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "facility_level")
public class FacilityLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "job_id")
    private int job_id;
    @Column(name = "housing")
    private String housing;
    @Column(name = "transportation")
    private String transportation;
    @Column(name = "healthcare")
    private String healthcare;

    @Override
    public String toString() {
        System.out.println("Facility Level ID: " + id);
        System.out.println("Job ID: " + job_id);
        System.out.println("Housing: " + housing);
        System.out.println("Transportation: " + transportation);
        System.out.println("Healthcare: " + healthcare);
        return null;
    }
}
