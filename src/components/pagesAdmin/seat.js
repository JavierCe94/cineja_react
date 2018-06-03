import React, { Component } from 'react';
import $ from 'jquery';

class Seat extends Component {
    componentDidMount = () => {
        $('[data-toggle="tooltip"]').tooltip();
    }

    tooltip = () => {
        return (
            `Fila: ${this.props.row}<br/>
            Butaca: ${this.props.column}<br/><br/>
            Precio: ${this.props.price}€`
        );
    };

    render() {
        return (
            <div className="margin-2 float-left">
                <button className="seat-select" type="button" data-toggle="tooltip" data-html={true} data-placement="top" title={this.tooltip()}>&#x2713;</button>
            </div>
        );
    }
}

export default Seat;
