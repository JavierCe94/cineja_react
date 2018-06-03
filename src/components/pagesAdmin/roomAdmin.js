import React, {Component} from 'react';
import { connect } from 'react-redux';
import ButtonBootstrap from '../buttonBootstrap';
import InputBootstrap from '../inputBootstrap';
import Room from './room';

class RoomAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            listRooms: []
        };
    }

    componentWillMount = () => {
        this.showRooms();
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

    showInputs = () => {
        const inputs = [
            {key: 'etInpName', comClass: 'input', type: 'text', label: 'Nombre', max: null, required: true, name: 'name'},
            {key: 'etInpSeatsByRow', comClass: 'input', type: 'number', label: 'Butacas por fila', max: 30, required: true, name: 'seatsRow'}
        ]

        return inputs.map(input => <InputBootstrap key={input.key} componentClass={input.comClass} 
            type={input.type} label={input.label} max={input.max} required={input.required} name={input.name} />);
    }

    createRoom = e => {
        e.preventDefault();
        const form = e.target; 
        fetch(`http://localhost:8000/admin/room/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    name: form.name.value,
                    totalseatsbyrow: form.seatsRow.value
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
                this.showRooms();
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }
    
    render() {
        return (
            <div className="container">
                <div className="col-md-8 float-left">
                    <div className="width-100 float-left">
                        <div style={{paddingTop: '10px'}}>
                            <div>
                                {this.state.listRooms.map((room) => 
                                    <Room key={`room${room.id}`} id={room.id} name={room.name} numberSeats={room.seatsRow} state={room.state} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 float-left">
                    <div className="background-white padding-25">
                        <form onSubmit={this.createRoom}>
                            {this.showInputs()}
                            {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Crear sala" />
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

export default connect(mapStateToProps)(RoomAdmin);
