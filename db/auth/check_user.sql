--This query checks for a user in the database by the email passed into the query
select * from users
where email = $1;

-- select * from users
-- where email = ${email};