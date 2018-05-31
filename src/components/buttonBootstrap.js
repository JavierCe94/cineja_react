import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonBootstrap = props => {
    return (
        <Button bsStyle={props.btnStyle} bsSize={props.size} block={props.block} type={props.type} className={props.className}>{props.text}</Button>
    );
}

export default ButtonBootstrap;
