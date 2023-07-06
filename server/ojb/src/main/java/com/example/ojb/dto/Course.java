package com.example.ojb.dto;
import lombok.Data;
import java.io.Serializable;

@Data
public class Course implements Serializable {
    private String course_name;
    private double course_credit;
    public Course(String course_name, double course_credit){
        this.course_name = course_name;
        this.course_credit = course_credit;
    }
    public Course(){
    }

    public String toString(){
        return "Course Name: " + course_name + "\n" +
                "Course Credit: " + course_credit + "\n";
    }
}
