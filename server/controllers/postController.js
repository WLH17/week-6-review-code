module.exports = {
    //This function is reponsible for creating a post and placing it in the database.
    createPost: (req, res) => {
        const {id, post} = req.body;
        const db = req.app.get('db');

        db.post.create_post(id, post)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    //This function will get ALL posts found in the database, whether or not they are the users posts.
    getPosts: (req, res) => {
        const db = req.app.get('db');

        db.post.get_posts()
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err))
    },
    //This will only grab the logged in users posts, to be displayed in Profile.js.
    getUserPosts: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err))
    }
}