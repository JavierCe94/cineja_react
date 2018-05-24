import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import LoginAdmin from './login_admin';
import MainAdmin from './main_admin';

const Admin = props => {
    return (
        <main>
            <Header />
                <Route exact path="/admin" component={LoginAdmin} />
                <Route exact path="/admin/main" component={MainAdmin} />
            <Footer />
        </main>
    );
}

export default Admin;
