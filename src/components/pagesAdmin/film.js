import React, { Component } from 'react';
import { Image, Clearfix } from 'react-bootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import Loader from '../loader';

class Film extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        };
    }

    loadImage = () => {
        this.setState({
            isLoad: false
        });
    }

    showElement = () => {
        if (this.state.isLoad) {
            return (
                <Loader withoutMargin={true} />
            );
        }
    }

    render() {
        return (
            <div className="col-md-12 padding-top-15">
                <div className="col-md-4 float-left">
                    {this.showElement()}
                    <Image className="width-100" src={this.props.image} onLoad={this.loadImage} responsive />
                </div>
                <div className="col-md-8 float-left">
                    <span className="bold-font-size-1 ">{this.props.name}</span>
                    <Clearfix />
                    <span className="font-size-0-85">{this.props.description}</span>
                    <Clearfix />
                    <ButtonBootstrap btnStyle="primary" text="Asignar hora" type="button" className="margin-right-10" />
                    <ButtonBootstrap btnStyle="primary" text="Asignar género" type="button" />
                </div>
                <Clearfix />
            </div>
        );
    }
}

export default Film;
