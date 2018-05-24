import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/pages_user/user';
import Admin from './components/pages_admin/admin';

const Main = () => {
    return (
        <Switch>
            <Route path="/user" component={User} />
            <Route path="/admin" component={Admin} />
        </Switch>
    );
}

export default Main;