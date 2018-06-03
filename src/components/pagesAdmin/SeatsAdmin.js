import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Clearfix } from 'react-bootstrap';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import Seat from './seat';
import Legend from '../legend';

class SeatsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            listSeats: [],
            nameRoom: '',
            seatsRow: 0,
            roomStateClose: false,
            textBtnCloseOpen: 'Cerrar sala',
            styleBtnCloseOpen: 'danger'
        };
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
                    seatsRow: jsonResponse.seatsRow,
                    roomStateClose: 'OPEN' === jsonResponse.state ? false : true,
                    textBtnCloseOpen: 'OPEN' !== jsonResponse.state ? 'Abrir sala' : 'Cerrar sala',
                    styleBtnCloseOpen: 'OPEN' !== jsonResponse.state ? 'success' : 'danger'
                });
                this.showSeats();
            }
        });
    }

    showSeats = () => {
        fetch(`http://localhost:8000/admin/seat/room/${this.props.match.params.room}/showseats`, {
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
                    listSeats: jsonResponse
                });
            }
        });
    }

    createSeats = e => {
        e.preventDefault();
        const form = e.target; 
        fetch(`http://localhost:8000/admin/seat/room/${this.props.match.params.room}/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    totalseatsroom: form.totalSeats.value,
                    priceseat: form.priceSeat.value
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
                this.showSeats();
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    closeOpenRoom = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/admin/room/${this.props.match.params.room}/${false === this.state.roomStateClose ? 'stateclose' : 'stateopen'}`, {
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
                code: response.status,
                roomStateClose: !this.state.roomStateClose
            });

            return response.json();
        })
        .then(jsonResponse => {
            if (200 === this.state.code) {
                this.setState({
                    textBtnCloseOpen: this.state.roomStateClose ? 'Abrir sala' : 'Cerrar sala',
                    styleBtnCloseOpen: this.state.roomStateClose ? 'success' : 'danger'
                });
            }
        });
    }

    showSeatsTick = () => {
        let row = 1;
        let column = 0;

        return this.state.listSeats.map((seat) => {
            if (this.state.seatsRow === column) {
                row++;
                column = 0;
                return <div><Clearfix key={`clearfix${seat.id}`} /> <Seat key={`seat${seat.id}`} price={seat.price} row={row} column={++column} /></div>;
            }

            return <Seat key={`seat${seat.id}`} price={seat.price} row={row} column={++column} />;
        })
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-8 float-left">
                    <div className="width-100 float-left">
                        <div className="horizontal-align-center" style={{paddingTop: '10px'}}>
                            <div>
                                <div className="margin-bottom-15">
                                    <h5>{this.state.nameRoom}</h5>
                                    <form onSubmit={this.closeOpenRoom}>
                                        <ButtonBootstrap className="margin-top-15" type="submit" btnStyle={this.state.styleBtnCloseOpen} text={this.state.textBtnCloseOpen} />
                                    </form>
                                    <Legend className="margin-top-15" />
                                </div>
                                {this.showSeatsTick()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 float-left">
                    <div className="background-white padding-25">
                        <form onSubmit={this.createSeats}>
                            <InputBootstrap type="number" label="Cantidad de butacas" max="250" name="totalSeats" />
                            <InputBootstrap type="number" step=".01" label="Precio de las butacas" name="priceSeat" />
                            {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Crear butacas" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        hasRedirect: state.hasRedirect
    }
}

export default connect(mapStateToProps)(SeatsAdmin);
