import React, { Component } from 'react';
import $ from 'jquery';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seatState: this.props.typeSpace ? 'seat-select-space-user' : this.props.typeNotAvailable ? 'seat-select-not-available' : 'seat-select',
            maxWidth: `calc(${this.props.maxWidth}% - 2px)`
        };
    }

    componentDidMount = () => {
        $('[data-toggle="tooltip"]').tooltip();
    }

    tooltip = () => {
        return (
            `Fila: ${this.props.row}<br/>
            Butaca: ${this.props.column}<br/><br/>
            Precio: ${this.props.price}€`
        );
    }

    clickSeat = (e) => {
        if ('seat-select-not-available' === this.state.seatState) {
            return;
        }
        if ('seat-select' === this.state.seatState) {
            if (10 === this.props.seatsSelected.length) {
                return;
            }
            this.props.seatsSelected.push(this.props.id);
            this.props.changeSeatsSelected(this.props.seatsSelected);
            this.setState({seatState: 'seat-select-sel'});
        } else {
            this.props.seatsSelected.map((seat, pos) => {
                if (this.props.id === seat) {
                    this.props.seatsSelected.splice(pos, 1);
                }
                
                return null;
            });
            this.props.changeSeatsSelected(this.props.seatsSelected);
            this.setState({seatState: 'seat-select'});
        }
    }

    showSeat = () => {
        if (this.props.typeSpace) {
            return <div className={`${this.state.seatState} margin-1 float-left`} style={{minWidth: this.state.maxWidth}}></div>;
        }

        return <div className={`${this.state.seatState} margin-1 float-left`} onClick={this.clickSeat} data-toggle="tooltip" data-html={true} 
            data-placement="top" title={this.tooltip()} style={{minWidth: this.state.maxWidth}}>
            {'seat-select-not-available' === this.state.seatState ? <span>X</span> : <span>&#x2713;</span>}</div>;
    }

    render() {
        return (
            this.showSeat()
        );
    }
}

export default Seat;
