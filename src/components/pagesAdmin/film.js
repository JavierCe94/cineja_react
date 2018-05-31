import React from 'react';
import { Image, Clearfix } from 'react-bootstrap';
import ButtonBootstrap from '../buttonBootstrap';

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
                <Clearfix />
                <ButtonBootstrap btnStyle="default" text="Nueva hora" type="button" className="margin-right-10" />
                <ButtonBootstrap btnStyle="default" text="Nuevo género" type="button" />
            </div>
            <Clearfix />
        </div>
    );
}

export default Film;
