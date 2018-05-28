import React from 'react';
import ImageUploader from 'react-images-upload';

const InputFileDragDrop = props => {
    return (
        <ImageUploader
            withIcon={true}
            buttonText={props.text}
            onChange={props.onDrop}
            imgExtension={props.extensions}
            maxFileSize={props.fileSize}
            withPreview={props.preview}
            name={props.name} />
    );
}

export default InputFileDragDrop;
