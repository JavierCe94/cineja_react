import React, { Component } from 'react';
import { Image, Clearfix } from 'react-bootstrap';
import ButtonBootstrap from '../buttonBootstrap';

class Film extends Component {
    render() {
        return (
            <div className="col-md-12 padding-top-15">
                <div className="col-md-4 float-left">
                    <Image className="width-100" src={this.props.image} responsive />
                </div>
                <div className="col-md-8 float-left">
                    <span className="bold-font-size-1 ">{this.props.name}</span>
                    <Clearfix />
                    <span className="font-size-0-85">{this.props.description}</span>
                    <Clearfix />
                    <ButtonBootstrap btnStyle="default" text="Asignar hora" type="button" className="margin-right-10" />
                    <ButtonBootstrap btnStyle="default" text="Asignar género" type="button" />
                </div>
                <Clearfix />
            </div>
        );
    }
}

export default Film;
