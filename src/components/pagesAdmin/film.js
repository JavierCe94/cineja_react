import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    showGenres = () => {
        return this.props.genres.map((genre) => <span key={`genre${genre.idFilmGenre}`} className="badge badge-secondary margin-right-5">{genre.nameGenre}</span>);
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
                    <div>
                        {this.showGenres()}
                    </div>
                    <div className="margin-bottom-15 font-size-0-85">
                        <span>Duración: {this.props.duration} min</span>
                        <Clearfix />
                        <span>Edad mínima {this.props.minAge}  años</span>
                    </div>
                    <Clearfix />
                    <ButtonBootstrap btnStyle="primary" text="Salas" type="button" className="margin-right-10" />
                    <Link to={`/admin/film/${this.props.id}`}>
                        <ButtonBootstrap btnStyle="primary" text="Géneros" type="button" />
                    </Link>
                </div>
                <Clearfix />
            </div>
        );
    }
}

export default Film;
