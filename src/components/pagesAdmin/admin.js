import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import Header from '../header';
import Footer from '../footer';
import LoginAdmin from './loginAdmin';
import MainAdmin from './mainAdmin';
import RoomAdmin from './roomAdmin';
import SeatsAdmin from './seatsAdmin';
import FilmGenreAdmin from './filmGenreAdmin';
import FilmRoomAdmin from './filmRoomAdmin';

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
                <Header userName={this.props.userName} hrefBrand={this.checkHrefBrand()} isMainAdmin={this.props.location.pathname.startsWith('/admin/')} />
                    <div className="background-light-grey">
                        <Route exact path="/admin" component={LoginAdmin} />
                        <Route exact path="/admin/main" component={MainAdmin} />
                        <Route exact path="/admin/rooms" component={RoomAdmin} />
                        <Route exact path="/admin/room/:room" component={SeatsAdmin} />
                        <Route exact path="/admin/filmgenres/:film" component={FilmGenreAdmin} />
                        <Route exact path="/admin/filmrooms/:film" component={FilmRoomAdmin} />
                        {'ROLE_ADMIN' !== this.props.role && '/admin' !== this.props.location.pathname ? <Redirect to="/admin" /> : null}
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

export default connect(mapStateToProps)(Admin);
