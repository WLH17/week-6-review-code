--This query selects all posts that the logged in user has made. This is done with a join statement, by joining users to user_posts ON the user_id column found in each table. The condition is added to ensure we are only recieving the logged in users posts.
select up.post_id, up.post from user_posts up
join users u on up.user_id = u.user_id
where u.user_id = $1;