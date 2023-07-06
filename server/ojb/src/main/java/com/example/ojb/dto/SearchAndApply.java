package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "search_and_apply")
public class SearchAndApply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name="js_id")
    private int js_id;
    @Column(name="job_id")
    private int job_id;

    public String toString(){
        return "Job Seeker ID: " + js_id + "\n" +
                "Job ID: " + job_id + "\n";
    }
}
