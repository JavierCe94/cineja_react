import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './navItem';

class Header extends Component {
    clearLocalStorage = (e) => {
        e.preventDefault();
        localStorage.clear();
        document.location.href = this.props.isMainAdmin ? '/admin' : '/user';
    }

    navsAdminMain = () => {
        const navs = [
            {key: 1, onClick: null, href: '/admin/rooms', text: 'Salas'},
            {key: 2, onClick: this.clearLocalStorage, href: '', text: 'Cerrar sesión'}
        ];

        return navs.map(nav => <NavItem key={nav.key} onClick={nav.onClick} href={nav.href} text={nav.text} />);
    }

    navsUserMain = () => {
        const navs = [
            {key: 1, onClick: this.clearLocalStorage, href: '/user', text: 'Cerrar sesión'}
        ];

        return navs.map(nav => <NavItem key={nav.key} onClick={nav.onClick} href={nav.href} text={nav.text} />);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to={this.props.hrefBrand}>Cineja</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ml-auto">
                            {this.props.isMainAdmin ? this.navsAdminMain() : this.props.isMainUser ? this.navsUserMain() : ''}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
