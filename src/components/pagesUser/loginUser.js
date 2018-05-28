import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import { Link, Redirect } from 'react-router-dom';

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasRedirect: false,
            errorMessage: ''
        }
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpUser', type: 'text', label: 'Email', required: true, name: "mail"},
            {key: 'etInpPass', type: 'password', label: 'Contraseña', required: true, name: 'password'}
        ]

        return inputs.map(input => <InputBootstrap key={input.key} type={input.type} label={input.label} required={input.required} name={input.name} />);
    }

    checkLoginUser = e => {
        e.preventDefault();
        const form = e.target;
        fetch('http://localhost:8000/user/login', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    mail: form.mail.value,
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
                        <form className="background-white padding-25" onSubmit={this.checkLoginUser}>
                            {this.showInputs()}
                            {this.state.hasRedirect ? <Redirect to="/user/main" /> : <label className="text-danger">{this.state.errorMessage}</label>}
                            <ButtonBootstrap btnStyle="primary" size="large" block={true} type="submit" text="Iniciar sesión" />
                        </form>
                        <span className="text-muted">Si no tienes una cuenta, </span><Link to="/user/signup">Regístrate</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginUser;
