package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "selection_team")
public class SelectionTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int team_id;
    @Column(name = "team_name")
    private String team_name;
    @Column(name = "team_leader")
    private String team_leader;
    @Column(name = "company_id")
    private int company_id;
    @Column(name = "contact_no")
    private String contact_no;
    @Column(name = "interview_format")
    private String interview_format;

    public String toString(){
        return "SelectionTeam [team_id=" + team_id
                + ", team_name=" + team_name
                + ", team_leader=" + team_leader
                + ", company_id=" + company_id
                + ", contact_no=" + contact_no
                + ", interview_format=" + interview_format + "]";
    }
}
