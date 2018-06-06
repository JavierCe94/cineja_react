import React from 'react';

const SelectBootstrap = (props) => {
    return (
        <div className="form-group">
            {'' !== props.label ? <label>{props.label}</label> : ''}
            <select className="form-control" required={props.required} name={props.name} onChange={props.onChange} value={props.value}>
                {props.withDefault ? <option value="">Selecciona {props.textDefault}</option> : ''}
                {props.options()}
            </select>
        </div>
    );
}

export default SelectBootstrap;
