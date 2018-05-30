import React from 'react';
import { Route } from 'react-router-dom';
import { Clearfix } from 'react-bootstrap';
import LoginUser from './loginUser';
import Signup from './signup';
import Header from '../header';
import Footer from '../footer';

const User = props => {
    return (
        <main>
            <Header />
                <div className="background-light-grey">
                    <Route exact path="/user" component={LoginUser} />
                    <Route exact path="/user/signup" component={Signup} />
                    <Clearfix />
                </div>
            <Footer />
        </main>
    );
}

export default User;
