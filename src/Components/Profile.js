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
        axios.get(`/api/user-posts/${this.props.user.user_id}`)
        .then(res => {
            this.setState({
                userPosts: res.data
            })
        })
    }

    render(){
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

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);