import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import LoginUser from './loginUser';
import Signup from './signup';
import Header from '../header';
import Footer from '../footer';
import MainUser from './mainUser';
import SeatsUser from './seatsUser';

class User extends Component {
    checkHrefBrand = () => {
        const url = this.props.location.pathname;
        switch (true) {
            case url.startsWith('/user/signup'):
                return '/user';
            case url.startsWith('/user/'):
                return '/user/main';
            default:
                return '/user';
        }
    }

    render() {
        return (
            <main>
                <Header userName={this.props.userName} hrefBrand={this.checkHrefBrand()} isMainUser={this.props.location.pathname.startsWith('/user/') &&
                    false === this.props.location.pathname.startsWith('/user/signup')} />
                    <div className="background-light-grey">
                        <Route exact path="/user" component={LoginUser} />
                        <Route exact path="/user/signup" component={Signup} />
                        <Route exact path="/user/main" component={MainUser} />
                        <Route exact path="/user/room/:room/filmroom/:filmroom" component={SeatsUser} />
                        {'ROLE_USER' !== this.props.role && '/user' !== this.props.location.pathname && '/user/signup' !== this.props.location.pathname ? <Redirect to="/user" /> : null}
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
        role: state.role,
        userName: state.userName
    }
}

export default connect(mapStateToProps)(User);
