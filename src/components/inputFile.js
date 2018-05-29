import React from 'react';

const InputFile = props => {
    return (
        <label className={props.class}>
            <span>{props.text}</span> <input type="file" style={{display: 'none'}} name={props.name} onChange={props.onChange} required={true} />
        </label>
    );
}

export default InputFile;
