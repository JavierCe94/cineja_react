import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
    clearLocalStorage = () => {
        localStorage.clear();
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="">Cineja</a>
                    </Navbar.Brand>
                </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} onClick={this.clearLocalStorage} href="/admin">
                            Cerrar sesión
                        </NavItem>
                    </Nav>
            </Navbar>
        );
    }
}

export default Header;
