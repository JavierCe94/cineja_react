import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import Seat from './seat';
import Legend from '../legend';
import Loader from '../loader';

class SeatsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
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
        fetch(`http://localhost:8000/user/seat/room/${this.props.match.params.room}/filmroom/${this.props.match.params.filmroom}/showseatsfilm`, {
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
                    listSeats: jsonResponse,
                    isLoad: false
                });
            }
        });
    }

    showSeatsTick = () => {
        let row = 1;
        let column = 0;
        let totalColumns = 0;

        return this.state.listSeats.map((seat) => {
            if (false === seat.typeSpace) {
                column += 1;
            }
            if (this.state.seatsRow === totalColumns) {
                row++;
                column = 1;
                totalColumns = 1;
                return <div key={`div${seat.id}`}><Clearfix />
                    <Seat id={seat.id} typeSpace={seat.typeSpace} seatsSelected={this.state.seatsSelected} 
                        changeSeatsSelected={this.changeSeatsSelected} price={seat.price} row={row} column={column} /></div>;
            }

            totalColumns++;
            return <Seat key={`seat${seat.id}`} id={seat.id} typeSpace={seat.typeSpace} seatsSelected={this.state.seatsSelected} 
                changeSeatsSelected={this.changeSeatsSelected} price={seat.price} row={row} column={column} />;
        })
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }
        
        return (
            <div>
                <div className="margin-bottom-15">
                    <h5>{this.state.nameRoom}</h5>
                    <Legend className="margin-top-15" />
                    <Clearfix />
                </div>
                {this.showSeatsTick()}
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-12 float-left">
                    <div className="col-md-12 float-left">
                        <div className="horizontal-align-center" style={{paddingTop: '10px'}}>
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
