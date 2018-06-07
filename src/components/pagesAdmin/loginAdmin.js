import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessage: ''
        };
        this.onLoginIn = this.onLoginIn.bind(this);
    }

    onLoginIn = (response) => {
        this.props.dispatch({
            type: 'LOGIN',
            token: response.token,
            role: 'ROLE_ADMIN',
            userName: response.userName
        });
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpUser', type: 'text', label: 'Usuario', required: true, name: "username"},
            {key: 'etInpPass', type: 'password', label: 'Contraseña', required: true, name: 'password'}
        ];

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
                    <form className="background-white padding-25" onSubmit={this.checkLoginAdmin}>
                        {this.showInputs()}
                        {'ROLE_ADMIN' === this.props.role ? <Redirect to="/admin/main" /> : <label className="text-danger">{this.state.errorMessage}</label>}
                        <ButtonBootstrap btnStyle="info" size="large" block={true} type="submit" text="Iniciar sesión" />
                    </form>
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

export default connect(mapStateToProps)(LoginAdmin);
