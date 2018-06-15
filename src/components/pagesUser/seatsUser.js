import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import Seat from './seat';
import Legend from '../legend';
import Loader from '../loader';
import ButtonBootstrap from '../buttonBootstrap';

class SeatsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            listSeats: [],
            seatsSelected: [],
            nameRoom: '',
            seatsRow: 0,
            isLoad: true
        };
    }

    changeSeatsSelected = (seatsSelected) => {
        this.setState({
            seatsSelected: seatsSelected
        });
    }

    componentWillMount = () => {
        this.showRoom();
    }

    showRoom = () => {
        fetch(`http://localhost:8000/admin/room/show/${this.props.match.params.room}`, {
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
                    nameRoom: jsonResponse.name,
                    seatsRow: jsonResponse.seatsRow
                });
                this.showSeats();
            }
        });
    }

    showSeats = () => {
        fetch(`http://localhost:8000/user/seat/room/${this.props.match.params.room}/filmroom/${this.props.match.params.filmroom}/showseats`, {
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
            this.setState({
                code: response.status
            });

            return response.json();
        })
        .then(jsonResponse => {
            if (200 === this.state.code) {
                this.setState({
                    listSeats: jsonResponse,
                    isLoad: false
                });
            }
        });
    }

    paySeats = (e) => {
        e.preventDefault();
        this.setState({
            isLoad: true
        });
        fetch(`http://localhost:8000/user/userseatfilm/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    seats: this.state.seatsSelected,
                    filmroom: this.props.match.params.filmroom
                }
            })
        })
        .then(response => {
            if (401 === response.status) {
                localStorage.clear();
            }
            this.setState({
                code: response.status
            });

            return response.json();
        })
        .then(jsonResponse => {
            if (201 === this.state.code) {
                this.setState({
                    seatsSelected: [],
                    errorMessageCreate: null
                });
                this.showSeats();
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    showSeatsTick = () => {
        let row = 1;
        let column = 0;
        let totalColumns = 0;
        const maxWidth = (1/this.state.seatsRow)*100;

        return this.state.listSeats.map((seat) => {
            if (false === seat.typeSpace) {
                column += 1;
            }
            if (this.state.seatsRow === totalColumns) {
                row++;
                column = 0;
                if (false === seat.typeSpace) {
                    column += 1;
                }
                totalColumns = 1;
                return <div key={`div${seat.id}`}><Clearfix />
                    <Seat id={seat.id} typeSpace={seat.typeSpace} seatsSelected={this.state.seatsSelected} typeNotAvailable={1 === seat.usersSeatFilm.length} 
                        changeSeatsSelected={this.changeSeatsSelected} price={seat.price} row={row} column={column} maxWidth={maxWidth} /></div>;
            }

            totalColumns++;
            return <Seat key={`seat${seat.id}`} id={seat.id} typeSpace={seat.typeSpace} seatsSelected={this.state.seatsSelected} 
                typeNotAvailable={1 === seat.usersSeatFilm.length} changeSeatsSelected={this.changeSeatsSelected} price={seat.price} 
                row={row} column={column} maxWidth={maxWidth} />;
        })
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }
        
        return (
            <div className="width-seats">
                <div className="margin-bottom-15">
                    <h5>{this.state.nameRoom}</h5>
                    <span className="bold-font-size-1">Puedes elegir hasta un máximo de 10 butacas</span>
                    <Legend className="margin-top-15" />
                    <Clearfix />
                </div>
                {this.showSeatsTick()}
                <Clearfix />
                {
                    0 !== this.state.seatsSelected.length ? 
                        <form className="float-left margin-top-15" onSubmit={this.paySeats} name="pay">
                            <span className="text-danger">{this.state.errorMessageCreate}</span>
                            <Clearfix />
                            <ButtonBootstrap btnStyle="primary" type="submit" text="Pagar" />
                        </form> : ''
                }
            </div>
        );
    }

    render() {
        return (
            <div className="container padding-0-max-width-767">
                <div className="col-md-12 padding-0-max-width-767 float-left">
                    <div className="col-md-12 padding-0-max-width-767 float-left">
                        <div className="horizontal-align-center">
                            {this.showElements()}
                        </div>
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

export default connect(mapStateToProps)(SeatsUser);
