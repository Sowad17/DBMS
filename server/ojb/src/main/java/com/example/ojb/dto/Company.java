package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "company")
public class Company implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private int company_id;
    @Column(name = "company_name")
    private String company_name;
    @Column(name = "net_worth")
    private double net_worth;
    @Column(name = "mobile_no")
    private String mobile_no;
    @Column (name = "email")
    private String email;
    @Column(name = "website")
    private String website;
    @Column(name = "established_year")
    private int established_year;
    @Column(name = "city")
    private String city;

    public String toString(){
        return "Company ID: " + company_id + "\n" +
                "Company Name: " + company_name + "\n" +
                "Net Worth: " + net_worth + "\n" +
                "Mobile No: " + mobile_no + "\n" +
                "Email: " + email + "\n" +
                "Website: " + website + "\n" +
                "Established Year: " + established_year + "\n" +
                "City: " + city + "\n";
    }
}
