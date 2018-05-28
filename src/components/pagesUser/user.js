import React from 'react';
import { Route } from 'react-router-dom';
import LoginUser from './loginUser';
import Signup from './signup';
import Header from '../header';
import Footer from '../footer';

const User = props => {
    return (
        <main>
            <Header />
                <Route exact path="/user" component={LoginUser} />
                <Route exact path="/user/signup" component={Signup} />
            <Footer />
        </main>
    );
}

export default User;
