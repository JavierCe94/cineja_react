import React from 'react';
import { Image } from 'react-bootstrap';
import InputFile from './inputFile';

const InputFilePreview = props => {
    return (
        <div className={props.divClass}>
            <Image className={`${props.previewClass} border-5-grey ${props.displayImage ? 'display-block' : 'display-none'}`} src={props.src} responsive />
            <InputFile class={props.inputClass} onChange={props.onChange} name="image" text="Elegir imagen" />
        </div>
    );
}

export default InputFilePreview;
