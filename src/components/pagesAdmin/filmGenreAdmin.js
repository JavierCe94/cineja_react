import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBootstrap from '../selectBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import InputBootstrap from '../inputBootstrap';
import FilmGenre from './filmGenre';
import Loader from '../loader';

class FilmGenreAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            errorMessageCreateSecond: null,
            nameFilm: null,
            filmGenres: [],
            listGenres: [],
            isLoad: true
        };
    }

    componentWillMount = () => {
        this.showFilm();
        this.showGenres();
    }

    showFilm = () => {
        fetch(`http://localhost:8000/admin/film/show/${this.props.match.params.film}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'X-AUTH-TOKEN': this.props.token
            }
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
                    nameFilm: jsonResponse.name,
                    filmGenres: jsonResponse.genres,
                    isLoad: false
                });
            }
        });
    }

    showGenres = () => {
        fetch(`http://localhost:8000/admin/genre/showgenres`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'X-AUTH-TOKEN': this.props.token
            }
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
                    listGenres: jsonResponse,
                    isLoad: false
                });
            }
        });
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpGenre', comClass: 'input', type: 'text', label: 'Nombre', required: true, name: 'name'},
        ]

        return inputs.map(input => <InputBootstrap key={input.key} componentClass={input.comClass} 
            type={input.type} label={input.label} required={input.required} name={input.name} />);
    }

    createGenre = e => {
        e.preventDefault();
        const form = e.target; 
        this.setState({
            isLoad: true
        });
        fetch(`http://localhost:8000/admin/genre/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    name: form.name.value,
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
            if (201 === this.state.code) {
                form.reset();
                this.setState({
                    errorMessageCreate: null
                });
                this.showGenres();
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    createFilmGenre = e => {
        e.preventDefault();
        const form = e.target; 
        this.setState({
            isLoad: true
        });
        fetch(`http://localhost:8000/admin/filmgenre/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    film: this.props.match.params.film,
                    genre: form.genre.value,
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
            if (201 === this.state.code) {
                form.reset();
                this.setState({
                    errorMessageCreateSecond: null
                });
                this.showFilm();
            } else {
                this.setState({
                    errorMessageCreateSecond: jsonResponse
                });
            }
        });
    }

    showFilmGenres = () => {
        return this.state.filmGenres.map((filmGenre) => <FilmGenre text={filmGenre.name} />);
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <h5>{this.state.nameFilm}</h5>
                <div>{this.showFilmGenres()}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-8 float-left">
                    <div className="width-100 float-left">
                        {this.showElements()}
                    </div>
                </div>
                <div className="col-md-4 float-left">
                    <div className="background-white padding-25">
                        <form onSubmit={this.createGenre}>
                            {this.showInputs()}
                            {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Crear género" />
                        </form>
                    </div>
                    <div className="background-white padding-25 margin-top-15">
                        <form onSubmit={this.createFilmGenre}>
                            <SelectBootstrap defaultText="género" label="Géneros" listGenres={this.state.listGenres} name="genre" required={true} />
                            {null !== this.state.errorMessageCreateSecond ? <label className="text-danger">{this.state.errorMessageCreateSecond}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Añadir a película" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(FilmGenreAdmin);
