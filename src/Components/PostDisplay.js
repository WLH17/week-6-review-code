import React from 'react';

const PostDisplay = props => {
    console.log(props)
    return (
        <div>
            <img src={props.post.post} alt='user post' height='100px'/>
        </div>
    )
}

export default PostDisplay;