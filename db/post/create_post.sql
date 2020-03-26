--This query will create a post, including a user_id that can be used for join statements like the one found in get_user_posts.sql
insert into user_posts (
    user_id,
    post
) values (
    $1,
    $2
);