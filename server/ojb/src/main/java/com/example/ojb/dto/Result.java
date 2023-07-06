package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name="js_id")
    private int js_id;
    @Column(name="job_id")
    private int job_id;
    @Column(name="company_id")
    private int company_id;
    @Column(name="status")
    private String status;

    public String toString() {
        return "Result [id=" + id +
                ", js_id=" + js_id +
                ", job_id=" + job_id +
                ", company_id=" + company_id +
                ", status=" + status + "]";
    }
}
