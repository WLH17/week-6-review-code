require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUnitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
});

//authentication endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//user post endpoints
app.post('/api/post', postCtrl.createPost);
app.get('/api/posts', postCtrl.getPosts);
app.get('/api/user-posts/:id', postCtrl.getUserPosts);

app.listen(port, () => console.log(`Server running on ${port}`));