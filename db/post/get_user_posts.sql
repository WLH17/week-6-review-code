select up.post_id, up.post from user_posts up
join users u on up.user_id = u.user_id
where u.user_id = $1;