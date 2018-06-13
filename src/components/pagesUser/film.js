import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Clearfix } from 'react-bootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import Loader from '../loader';

class Film extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmRooms: [],
            isLoad: true,
            isLoadRooms: true
        };
    }

    componentWillMount() {
        this.showFilmRooms();
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

    showFilmRooms = () => {
        fetch(`http://localhost:8000/admin/filmroom/film/${this.props.id}/showrooms`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    date: this.props.date
                }
            })
        })
        .then(response => {
            if (401 === response.status) {
                localStorage.clear();
            }
            this.setState({code: response.status});

            return response.json();
        })
        .then(jsonResponse => {
            if (200 === this.state.code) {
                this.setState({
                    filmRooms: jsonResponse,
                    isLoadRooms: false
                });
            }
        });
    }

    showFilmRoomsButtons = () => {
        if (this.state.isLoadRooms) {
            return <Loader withoutMargin={true} />;
        }

        return this.state.filmRooms.map((room) => <Link key={`room${room.id}`} to={`/user/room/${room.room.id}/filmroom/${room.id}`}><ButtonBootstrap btnStyle="warning" 
            className="margin-right-5 margin-bottom-5" text={room.releaseDate} /></Link>);
    }

    render() {
        return (
            <div className="col-md-12 padding-top-15">
                <div className="col-md-3 float-left">
                    {this.showElement()}
                    <Image className="width-100-film height-200-max-width-767" src={this.props.image} onLoad={this.loadImage} responsive />
                </div>
                <div className="col-md-9 float-left">
                    <span className="bold-font-size-1-15">{this.props.name}</span>
                    <Clearfix />
                    <span className="font-size-1">{this.props.description}</span>
                    <Clearfix />
                    <div>
                        {this.showGenres()}
                    </div>
                    <div className="margin-bottom-15 font-size-1">
                        <span>Duración: {this.props.duration} min</span>
                        <Clearfix />
                        <span>Edad mínima: {this.props.minAge}  años</span>
                        <Clearfix />
                        {this.showFilmRoomsButtons()}
                    </div>
                </div>
                <Clearfix />
            </div>
        );
    }
}

export default Film;
