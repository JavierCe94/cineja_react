import React from 'react';
import { Image, Clearfix } from 'react-bootstrap';

const Film = props => {
    return (
        <div className="col-md-12 padding-top-15">
            <div className="col-md-4 float-left">
                <Image className="width-100" src={props.image} responsive />
            </div>
            <div className="col-md-8 float-left">
                <span className="bold-font-size-1 ">{props.name}</span>
                <Clearfix />
                <span className="font-size-0-85">{props.description}</span>
            </div>
            <Clearfix />
        </div>
    );
}

export default Film;
