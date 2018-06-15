import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Clearfix } from 'react-bootstrap';

class Room extends Component {
    render() {
        return (
            <div className="col-md-12 padding-0-max-width-767 margin-bottom-15">
                <Link to={`/admin/room/${this.props.id}`}>
                    <div className="col-md-12 padding-0-max-width-480 float-left hover-hand">
                        <span className="bold-font-size-1 margin-right-10">{this.props.name}</span>
                        <span className={`font-size-0-85-bold ${'OPEN' === this.props.state ? 'text-success' : 'text-danger'}`}>
                            {'OPEN' === this.props.state ? 'Abierta' : 'Cerrada'}</span>
                        <Clearfix />
                        <span className="font-size-0-85">{this.props.numberSeats} butacas por fila</span>
                    </div>
                </Link>
                <Clearfix />
            </div>
        );
    }
}

export default Room;
