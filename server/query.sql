1. Join Login and JobSeeker table by email
SELECT j FROM JobSeeker j JOIN Login l WHERE l.email = :email

2. Join Login and Company table by email 
SELECT c FROM Company c JOIN Login l WHERE l.email = :email


