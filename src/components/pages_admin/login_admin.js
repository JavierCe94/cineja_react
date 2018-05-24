import React, { Component } from 'react';
import InputBootstrap from '../input_bootstrap';
import ButtonBootstrap from '../button_bootstrap';
import  { Redirect } from 'react-router-dom';

class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasRedirect: false,
            errorMessage: ''
        }
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpUser', type: 'text', label: 'Usuario', required: true, name: "username"},
            {key: 'etInpPass', type: 'password', label: 'Contraseña', required: true, name: 'password'}
        ]

        return inputs.map(input => <InputBootstrap key={input.key} type={input.type} label={input.label} required={input.required} name={input.name} />);
    }

    checkLoginAdmin = e => {
        e.preventDefault();
        const form = e.target;
        fetch('http://localhost:8000/admin/login', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    username: form.username.value,
                    password: form.password.value
                }
            })
        })
        .then(response => {
            if (200 === response.status) {
                document.cookie = `token=${response.json()}`;
                return null;
            }
            
            return response.json();
        })
        .then(jsonResponse => {
            if (null !== jsonResponse) {
                this.setState({
                    errorMessage: jsonResponse
                });
            } else {
                this.setState({
                    hasRedirect: true
                });
            }
        });
    }

    render() {
        return (
            <div className="background-light-grey">
                <div className="container">
                    <div className="col-md-4 center-block">
                        <form className="background-white padding-25" onSubmit={this.checkLoginAdmin}>
                            {this.showInputs()}
                            {this.state.hasRedirect ? <Redirect to="/admin/main" /> : <label className="text-danger">{this.state.errorMessage}</label>}
                            <ButtonBootstrap btnStyle="primary" size="large" block={true} type="submit" text="Iniciar sesión" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginAdmin;
