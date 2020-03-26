--This query will add a user, recieving needed information from the handler function for register found in authController.js
insert into users (
    email,
    password,
    username
) values (
    ${email},
    ${password},
    ${username}
)
returning user_id, email, username;

-- insert into users (
--     email,
--     password,
--     username
-- ) values (
--     $1,
--     $2,
--     $3
-- );