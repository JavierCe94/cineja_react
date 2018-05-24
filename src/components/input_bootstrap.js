import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const InputBootstrap = props => {
    return (
        <FormGroup>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl componentClass={props.componentClass} type={props.type} required={props.required} name={props.name} />
        </FormGroup>
    );
}

export default InputBootstrap;
