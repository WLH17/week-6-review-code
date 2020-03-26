import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PostDisplay from './PostDisplay';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userPosts: []
        }
    }

    componentDidMount(){
        //This request will grab ONLY the users posts, instead of all posts found in the database. This is done in a join statement found in get_user_posts.sql
        axios.get(`/api/user-posts/${this.props.user.user_id}`)
        .then(res => {
            this.setState({
                userPosts: res.data
            })
        })
    }

    render(){
        //Here we map over the user posts and pass them to PostDisplay to display them.
        const mappedPosts = this.state.userPosts.map((post, i) => (
            <PostDisplay key={i} post={post}/>
        ))
        return(
            <div>
                <h1>Welcome, {this.props.user.username}</h1>
                {mappedPosts}
            </div>
        )
    }
}

//Here we are subcribing to reduxState
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);