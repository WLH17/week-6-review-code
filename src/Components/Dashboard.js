import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PostDisplay from './PostDisplay';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            postInput: '',
            posts: []
        }
    }

    componentDidMount(){
        //See below to see what this function does.
        this.getPosts();
    }

    //This function grabs all posts found in the database.
    getPosts = () => {
        axios.get('/api/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    //This function will send the user_id from redux as well as an image url to the server to be added to the database.
    createPost = () => {
        axios.post('/api/post', {id: this.props.user.user_id, post: this.state.postInput})
        .then(() => {
            //See above to see what this function does.
            this.getPosts();
        })
        .catch(err => console.log(err))
    }

    handleInput = (val) => {
        this.setState({
            postInput: val
        })
    }

    render(){
        //Here we are mapping over the posts recieved from the database to pass them into PostDisplay, which will handle displaying the post data.
        const mappedPosts = this.state.posts.map((post, i) => (
            <PostDisplay key={i} post={post}/>
        ))
        return(
            <div>
                <input 
                    placeholder='Image URL'
                    onChange={(e) => this.handleInput(e.target.value)}/>
                <button onClick={this.createPost}>Add Post</button>
                {mappedPosts}
            </div>
        )
    }
}

//mapStateToProps is how we subscribe to state values on redux. You need to return which items you want to subscribe to, or just return the entirety of reduxState like we are doing below.
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);