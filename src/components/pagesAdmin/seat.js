import React, { Component } from 'react';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seatState: this.props.typeSpace ? 'seat-select-space' : 'seat-select',
            maxWidth: `calc(${this.props.maxWidth}% - 2px)`
        };
    }

    clickSeat = (e) => {
        if ('seat-select' === this.state.seatState || 'seat-select-space' === this.state.seatState) {
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
            this.props.typeSpace ? this.setState({seatState: 'seat-select-space'}) : this.setState({seatState: 'seat-select'});
        }
    }

    render() {
        return (
            <div className={`${this.state.seatState} margin-1 float-left`} onClick={this.clickSeat} 
                style={{minWidth: this.state.maxWidth}}>&#x2713;</div>
        );
    }
}

export default Seat;
