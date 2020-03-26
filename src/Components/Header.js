import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/reducer';
import axios from 'axios';

const Header = props => {
    const handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            props.logoutUser();
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

export default withRouter(connect(null, {logoutUser})(Header));