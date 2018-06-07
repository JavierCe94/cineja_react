import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessage: ''
        }
        this.onLoginIn = this.onLoginIn.bind(this);
    }

    onLoginIn = (response) => {
        this.props.dispatch({
            type: 'LOGIN',
            token: response.token,
            role: 'ROLE_USER',
            userName: response.userName
        });
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
            this.setState({
                code: response.status
            });
            
            return response.json();
        })
        .then(jsonResponse => {
            if (200 !== this.state.code) {
                this.setState({
                    errorMessage: jsonResponse
                });
            } else {
                this.onLoginIn(jsonResponse);
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-4 center-block">
                    <form className="background-white padding-25" onSubmit={this.checkLoginUser}>
                        {this.showInputs()}
                        {'ROLE_USER' === this.props.role ? <Redirect to="/user/main" /> : <label className="text-danger">{this.state.errorMessage}</label>}
                        <ButtonBootstrap btnStyle="info" size="large" block={true} type="submit" text="Iniciar sesión" />
                    </form>
                    <span className="text-muted">Si no tienes una cuenta, </span><Link to="/user/signup">Regístrate</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        role: state.role
    }
}

export default connect(mapStateToProps)(LoginUser);
