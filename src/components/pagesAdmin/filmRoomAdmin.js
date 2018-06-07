import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonBootstrap from '../buttonBootstrap';
import Loader from '../loader';
import SelectBootstrap from '../selectBootstrap';
import Room from './room';

class FilmRoomAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            nameFilm: null,
            listRooms: [],
            filmRooms: [],
            selectedValue: new Date().toLocaleDateString().replace('/', '-').replace('/', '-'),
            isLoad: true
        };
    }

    componentWillMount() {
        this.showFilm();
        this.showRooms();
        this.showFilmRooms(this.state.selectedValue);
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
                    nameFilm: jsonResponse.name
                });
            }
        });
    }

    showRooms = () => {
        fetch(`http://localhost:8000/admin/room/showrooms`, {
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
                    listRooms: jsonResponse
                });
            }
        });
    }

    showFilmRooms = (date) => {
        fetch(`http://localhost:8000/admin/filmroom/film/${this.props.match.params.film}/showrooms`, {
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
                    filmRooms: jsonResponse,
                    isLoad: false
                });
            }
        });
    }

    createFilmRoom = e => {
        e.preventDefault();
        const form = e.target; 
        this.setState({
            isLoad: true
        });
        fetch(`http://localhost:8000/admin/filmroom/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    film: this.props.match.params.film,
                    room: form.room.value,
                    releasedate: `${form.day.value} ${form.hour.value}`
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
                this.showFilmRooms(this.state.selectedValue);
            } else {
                this.setState({
                    errorMessageCreateSecond: jsonResponse
                });
            }
        });
    }

    showFilmRoomsByDate = (e) => {
        this.setState({
            selectedValue: e.target.value,
            isLoad: true
        });
        this.showFilmRooms(e.target.value);
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
                <div>
                    <SelectBootstrap label={''} onChange={this.showFilmRoomsByDate} value={this.state.selectedValue} options={this.showSevenDays} />
                </div>
                <div>
                    {this.state.filmRooms.map((room) => <Room key={`room${room.room.id}`} id={room.room.id} name={`${room.room.name} ${room.releaseDate}`}
                        numberSeats={room.room.seatsRow} state={room.room.state} />)}
                </div>
            </div>
        );
    }

    showOptionsRooms = () => {
        return this.state.listRooms.map((room) => <option key={`genre${room.id}`} value={room.id}>{room.name}</option>);
    }

    showSevenDays = () => {
        const date = new Date();
        const listDays = [];
        for (let i = 0; i < 7; i++) {
            listDays.push({value: date.toLocaleDateString().replace('/', '-').replace('/', '-'), text: date.toLocaleDateString()});
            date.setDate(date.getDate() + 1);
        }

        return listDays.map((day) => <option key={`day${day.value}`} value={day.value}>{day.text}</option>);
    }

    showHours = () => {
        const date = new Date();
        date.setHours(16);
        date.setMinutes(0);
        date.setSeconds(0);
        let listHours = [];
        for (let i = 0; i < 10; i++) {
            listHours.push({value: date.toLocaleTimeString(), text: date.toLocaleTimeString()});
            date.setMinutes(date.getMinutes() + 45);
        }

        return listHours.map((hour) => <option key={`day${hour.value}`} value={hour.value}>{hour.text}</option>);
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
                        <form onSubmit={this.createFilmRoom}>
                            <SelectBootstrap withDefault={true} textDefault="sala" label="Salas" options={this.showOptionsRooms} name="room" required={true} />
                            <SelectBootstrap withDefault={true} textDefault="día" label="Días" options={this.showSevenDays} name="day" required={true} />
                            <SelectBootstrap withDefault={true} textDefault="hora" label="Horas" options={this.showHours} name="hour" required={true} />
                            {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Añadir sala" />
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

export default connect(mapStateToProps)(FilmRoomAdmin);
