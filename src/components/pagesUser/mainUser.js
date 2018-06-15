import React, { Component } from 'react';
import { connect } from 'react-redux';
import Film from './film';
import Loader from '../loader';
import SelectBootstrap from '../selectBootstrap';

class MainUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            listFilms: [],
            selectedValue: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'),
            isLoad: true
        }
    }

    componentWillMount = () => {
        this.showFilms();
    }

    showFilms = (date = null) => {
        fetch(`http://localhost:8000/admin/film/showfilmsrooms`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    date: date
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
                    listFilms: jsonResponse,
                    isLoad: false
                });
            }
        });
    }

    showFilmsByDate = (e) => {
        this.setState({
            selectedValue: e.target.value,
            isLoad: true
        });
        this.showFilms('' !== e.target.value ? e.target.value : null);
    }

    showSevenDays = () => {
        const date = new Date();
        let listDays = [];
        for (let i = 0; i < 7; i++) {
            listDays.push({value: date.toLocaleDateString().replace('/', '-').replace('/', '-'), text: date.toLocaleDateString()});
            date.setDate(date.getDate() + 1);
        }

        return listDays.map((day) => <option key={`day${day.value}`} value={day.value}>{day.text}</option>);
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <div>
                    <SelectBootstrap withDefault={false} label={''} onChange={this.showFilmsByDate} value={this.state.selectedValue} options={this.showSevenDays} />
                </div>
                <div>
                    {this.state.listFilms.map((film) => {
                        return <Film key={`film${film.id}`} id={film.id} image={`http://localhost:8000/uploads/films/${film.image}`} name={film.name} token={this.props.token}
                            description={film.description} minAge={film.minAge} duration={film.duration} filmRooms={film.filmRooms} genres={film.filmGenres} date={this.state.selectedValue} />;
                    })}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container padding-0-max-width-767">
                <div className="col-md-12 padding-0-max-width-767 float-left">
                    <div className="col-md-12 padding-0-max-width-767">
                        {this.showElements()}
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

export default connect(mapStateToProps)(MainUser);
