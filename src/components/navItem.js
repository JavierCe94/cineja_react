import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" onClick={props.onClick} to={props.href}>{props.text}</Link>
        </li> 
    );
}

export default NavItem;
