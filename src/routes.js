import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/profile' component={Profile} />
    </Switch>
)