package com.example.ojb.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "login")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "email")
    private String email;
    @Column (name = "password")
    private String password;
    @Column (name = "role")
    private String role;

    public Login() {
    }
    public Login(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String toString(){
        return "Login [id=" + id + ", email=" + email + ", password=" + password + ", role=" + role + "]";
    }
}
