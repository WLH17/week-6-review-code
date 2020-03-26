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