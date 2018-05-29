import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header';
import Footer from '../footer';
import LoginAdmin from './loginAdmin';
import MainAdmin from './mainAdmin';

const Admin = props => {
    return (
        <main>
            <Header />
                <Route exact path="/admin" component={LoginAdmin} />
                <Route exact path="/admin/main" component={MainAdmin} />
                {false === props.hasRedirect && '/admin' !== props.location.pathname ? <Redirect to="/admin" /> : null}
            <Footer />
        </main>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token,
        hasRedirect: state.hasRedirect
    }
}

export default connect(mapStateToProps)(Admin);
