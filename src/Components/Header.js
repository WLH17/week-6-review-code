import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/reducer';
import axios from 'axios';

const Header = props => {
    //This function will run the axios request for logging out, which will clear the users information from sessions.
    const handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            //This action(found in reducer.js) will clear the users information from redux state.
            props.logoutUser();
            //We use push to navigate the user back to the landing page.
            props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/profile'>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

//When you need to use withRouter an a component that is also using connect, you MUST wrap the entire connect statement in withRouter.
export default withRouter(connect(null, {logoutUser})(Header));