import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoIsTypeError: true,
            infoMessage: ''
        }
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpMail', type: 'text', label: 'Email', required: true, name: "mail"},
            {key: 'etInpName', type: 'text', label: 'Nombre', required: true, name: "name"},
            {key: 'etInpSurname', type: 'text', label: 'Apellidos', required: true, name: "surname"},
            {key: 'etInpCreditCard', type: 'text', label: 'Tarjeta de crédito', required: true, name: "creditcard"},
            {key: 'etInpPass', type: 'password', label: 'Contraseña', required: true, name: 'password'},
            {key: 'etInpPassRep', type: 'password', label: 'Repetir Contraseña', required: true, name: 'repitPassword'}
        ]

        return inputs.map(input => <InputBootstrap key={input.key} type={input.type} label={input.label} required={input.required} name={input.name} />);
    }
    
    createUser = e => {
        e.preventDefault();
        const form = e.target;
        if (form.password.value !== form.repitPassword.value) {
            this.setState({
                infoMessage: 'Las contraseñas no coinciden'
            })
            return;
        }
        fetch('http://localhost:8000/user/create', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    mail: form.mail.value,
                    name: form.name.value,
                    surname: form.surname.value,
                    creditcard: form.creditcard.value,
                    password: form.password.value
                }
            })
        })
        .then(response => {
            if (201 === response.status) {
                form.reset();
                this.setState({
                    infoIsTypeError: false
                });
            }

            return response.json();
        })
        .then(jsonResponse => {
            this.setState({
                infoMessage: jsonResponse
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-4 center-block">
                    <form className="background-white padding-25" onSubmit={this.createUser}>
                        {this.showInputs()}
                        <label className={this.state.infoIsTypeError ? 'text-danger' : 'text-success'}>{this.state.infoMessage}</label>
                        <ButtonBootstrap btnStyle="info" size="large" block={true} type="submit" text="Registrar" />
                    </form>
                    <span className="text-muted">Si ya tienes una cuenta, </span><Link to="/user">Inicia sesión</Link>
                </div>
            </div>
        );
    }
}

export default Signup;
