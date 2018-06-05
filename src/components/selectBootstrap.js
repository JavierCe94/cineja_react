import React from 'react';

const SelectBootstrap = (props) => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <select className="form-control" required={props.required} name={props.name}>
                <option value="">Selecciona {props.defaultText}</option>
                {props.listGenres.map((genre) => <option key={`genre${genre.id}`} value={genre.id}>{genre.name}</option>)}
            </select>
        </div>
    );
}

export default SelectBootstrap;
