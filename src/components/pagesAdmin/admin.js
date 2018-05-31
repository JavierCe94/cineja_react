import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import Header from '../header';
import Footer from '../footer';
import LoginAdmin from './loginAdmin';
import MainAdmin from './mainAdmin';

class Admin extends Component {
    checkHrefBrand = () => {
        const url = this.props.location.pathname;
        switch (true) {
            case url.startsWith('/admin/'):
                return '/admin/main';
            default:
                return '/admin';
        }
    }

    render() {
        return (
            <main>
                <Header hrefBrand={this.checkHrefBrand()} isMainAdmin={this.props.location.pathname.startsWith('/admin/')} />
                    <div className="background-light-grey">
                        <Route exact path="/admin" component={LoginAdmin} />
                        <Route exact path="/admin/main" component={MainAdmin} />
                        {false === this.props.hasRedirect && '/admin' !== this.props.location.pathname ? <Redirect to="/admin" /> : null}
                        <Clearfix />
                    </div>
                <Footer />
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        hasRedirect: state.hasRedirect
    }
}

export default connect(mapStateToProps)(Admin);
