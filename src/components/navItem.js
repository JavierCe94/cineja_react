import React from 'react';

const NavItem = (props) => {
    return (
        <li className="nav-item">
            <a className="nav-link" onClick={props.onClick} href={props.href}>{props.text}</a>
        </li> 
    );
}

export default NavItem;
