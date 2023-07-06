create table login (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR2(100) UNIQUE,
    password VARCHAR2(100),
    role VARCHAR2(20)
);

CREATE TABLE job (
    job_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_offering_company VARCHAR2(100),
    job_location VARCHAR2(100),
    appointment DATE,
    facility_grade CHAR(1),
    experience_grade VARCHAR(10),
    education VARCHAR2(100),
    course VARCHAR2(100),
    job_type VARCHAR2(50),
    age NUMBER
);

CREATE TABLE facility_level (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id NUMBER,
    housing VARCHAR2(3) CHECK (housing IN ('Yes', 'No')),
    transportation VARCHAR2(3) CHECK (transportation IN ('Yes', 'No')),
    healthcare VARCHAR2(3) CHECK (healthcare IN ('Yes', 'No')),
    CONSTRAINT facility_level_job_fk FOREIGN KEY (job_id) REFERENCES job(job_id) ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER update_facility_grade
AFTER INSERT OR UPDATE OF housing, transportation, healthcare ON facility_level
FOR EACH ROW
BEGIN
    UPDATE job
    SET facility_grade = CASE
        WHEN :new.housing = 'Yes' AND :new.transportation = 'Yes' AND :new.healthcare = 'Yes' THEN 'A'
        WHEN (:new.housing = 'Yes' AND :new.transportation = 'Yes' AND :new.healthcare = 'No') OR
             (:new.housing = 'Yes' AND :new.transportation = 'No' AND :new.healthcare = 'Yes') OR
             (:new.housing = 'No' AND :new.transportation = 'Yes' AND :new.healthcare = 'Yes') THEN 'B'
        ELSE 'C'
    END
    WHERE job_id = :new.job_id;
END;
/

CREATE TABLE experience_category (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id NUMBER REFERENCES job(job_id),
    year NUMBER,
    CONSTRAINT experience_category_year_check CHECK (year >= 0)
);


CREATE OR REPLACE TRIGGER update_experience_grade
AFTER INSERT OR UPDATE OF year ON experience_category
FOR EACH ROW
BEGIN
    UPDATE job
    SET experience_grade = CASE
        WHEN :new.year < 5 THEN 'Low'
        WHEN :new.year >= 5 AND :new.year <= 10 THEN 'Average'
        ELSE 'High'
    END
    WHERE job_id = :new.job_id;
END;
/

CREATE OR REPLACE TYPE course_type AS OBJECT (
    course_name VARCHAR2(100),
    course_credit NUMBER
);

CREATE TABLE job_seeker (
    js_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(100),
    dob DATE,
    gender VARCHAR2(10),
    experience NUMBER,
    courses VARCHAR2(100),
    address VARCHAR2(200),
    mobile_no VARCHAR2(20),
    email VARCHAR2(100),
    education VARCHAR2(100),
    age NUMBER
);
CREATE TABLE company (
    company_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name VARCHAR2(100),
    net_worth NUMBER,
    mobile_no VARCHAR2(20),
    email VARCHAR2(100),
    website VARCHAR2(100),
    established_year NUMBER,
    city VARCHAR2(100)
);

CREATE TABLE selection_team (
    team_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_name VARCHAR2(100),
    team_leader VARCHAR2(100),
    company_id NUMBER REFERENCES company(company_id),
    contact_no VARCHAR2(20),
    interview_format VARCHAR2(100)
);

CREATE TABLE check_criteria (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id NUMBER REFERENCES job(job_id),
    team_id NUMBER REFERENCES selection_team(team_id)
);

CREATE TABLE post (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id NUMBER REFERENCES job(job_id),
    company_id NUMBER REFERENCES company(company_id),
    company_name VARCHAR2(100)
);
CREATE TABLE interview (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id NUMBER REFERENCES job(job_id),
    team_id NUMBER REFERENCES selection_team(team_id)
);
CREATE TABLE hires_using (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_id NUMBER REFERENCES selection_team(team_id),
    company_id NUMBER REFERENCES company(company_id),
    team_name VARCHAR2(100),
    company_name VARCHAR2(100)
);
CREATE TABLE publish (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    js_id NUMBER REFERENCES job_seeker(js_id),
    job_id NUMBER REFERENCES job(job_id),
    company_id NUMBER REFERENCES company(company_id),
    team_id NUMBER REFERENCES selection_team(team_id)
);
CREATE TABLE result (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    js_id NUMBER REFERENCES job_seeker(js_id),
    job_id NUMBER REFERENCES job(job_id),
    company_id NUMBER REFERENCES company(company_id),
    status VARCHAR(20)
);

create table SEARCH_AND_APPLY(
    ID NUMBER generated as identity primary key,
    JS_ID  NUMBER
        references ADMIN.JOB_SEEKER,
    JOB_ID NUMBER
        references ADMIN.JOB
)





