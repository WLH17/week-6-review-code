import React from 'react';

//PostDisplay handles the displaying of Post data for both Dashboard.js and Profile.js
const PostDisplay = props => {
    console.log(props)
    return (
        <div>
            <img src={props.post.post} alt='user post' height='100px'/>
        </div>
    )
}

export default PostDisplay;