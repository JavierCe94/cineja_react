import React, { Component } from 'react';
import $ from 'jquery';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seatState: this.props.typeSpace ? 'seat-select-space' : 'seat-select'
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
        if ('seat-select' === this.state.seatState || 'seat-select-space' === this.state.seatState) {
            this.props.seatsSelected.push(this.props.id);
            this.props.changeSeatsSelected(this.props.seatsSelected);
            this.setState({seatState: 'seat-select-sel'});
        }
        else {
            this.props.seatsSelected.map((seat, pos) => {
                if (this.props.id === seat) {
                    this.props.seatsSelected.splice(pos, 1);
                }
                return null;
            });
            this.props.changeSeatsSelected(this.props.seatsSelected);
            this.props.typeSpace ? this.setState({seatState: 'seat-select-space'}) : this.setState({seatState: 'seat-select'});
        }
    }

    render() {
        return (
            <div className="margin-2 float-left">
                <div className={this.state.seatState} onClick={this.clickSeat} data-toggle="tooltip" data-html={true} 
                    data-placement="top" title={this.tooltip()}>&#x2713;</div>
            </div>
        );
    }
}

export default Seat;