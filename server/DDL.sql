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
    courses course_type,
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


SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM SearchAndApply s WHERE s.js_id = ?1 AND s.job_id = ?2

UPDATE Company c SET c.company_name = :company_name, c.city = :city, c.established_year = :established_year, c.mobile_no = :mobile_no, c.net_worth = :net_worth, c.website = :website WHERE c.email = :email

UPDATE JobSeeker j SET j.name=:name, j.gender=:gender, j.experience=:experience, j.courses=:courses, j.address=:address, j.mobile_no=:mobile_no, j.education=:education, j.age=:age WHERE j.email=:email

create trigger UPDATE_EXPERIENCE_GRADE
    after insert or update of YEAR
                    on EXPERIENCE_CATEGORY
                        for each row
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

create trigger UPDATE_FACILITY_GRADE
    after insert or update of HOUSING,TRANSPORTATION,HEALTHCARE
                    on FACILITY_LEVEL
                        for each row
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

SELECT j FROM Job j JOIN Post p ON j.job_id = p.job_id WHERE p.company_id = (SELECT c.company_id FROM Company c WHERE c.email = :email)

select max(j.job_id) from Job j

SELECT c FROM Post p join Company c WHERE p.job_id = :job_id AND c.company_id = p.company_id;

select j from Job j join Post p on j.job_id = p.job_id where p.company_id = :companyId;

SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END FROM Post p WHERE p.company_id = ?1 AND p.job_id = ?2;

create trigger JOB_APPOINTMENT_TRIGGER
    before update
    on JOB
    for each row
BEGIN
    -- Check if the appointment time has passed
    IF :NEW.appointment < SYSDATE THEN
    -- Delete the record from the dependent tables using cascading delete
    DELETE FROM facility_level WHERE job_id = :NEW.job_id;
    DELETE FROM experience_category WHERE job_id = :NEW.job_id;
    -- Add more DELETE statements for other dependent tables as needed
END IF;
END;
/

CREATE OR REPLACE PROCEDURE delete_expired_jobs
AS
BEGIN
DELETE FROM job
WHERE time_of_appointment < SYSDATE;
END;

CREATE OR REPLACE SCHEDULED JOB job_deleter
RUNS AT INTERVAL '1 DAY' CYCLE '1' STARTS '2023-06-25 00:00:00'
ENABLED;