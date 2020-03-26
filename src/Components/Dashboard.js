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
        this.getPosts();
    }

    getPosts = () => {
        axios.get('/api/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    createPost = () => {
        axios.post('/api/post', {id: this.props.user.user_id, post: this.state.postInput})
        .then(() => {
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

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);