import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import User from './components/pagesUser/user';
import Admin from './components/pagesAdmin/admin';

const Main = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="user" />
            <Route path="/user" component={User} />
            <Route path="/admin" component={Admin} />
        </Switch>
    );
}

export default Main;
