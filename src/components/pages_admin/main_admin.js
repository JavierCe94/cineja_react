import React, { Component } from 'react';
import InputBootstrap from '../input_bootstrap';

class MainAdmin extends Component {
    showInputs = () => {
        const inputs = [
            {key: 'etInpUser', comClass: 'input', type: 'file', label: 'Imagen', required: true, name: "image"},
            {key: 'etInpPass', comClass: 'input', type: 'text', label: 'Nombre', required: true, name: 'name'},
            {key: 'etInpPass', comClass: 'textarea', type: 'text', label: 'Descripción', required: true, name: 'description'},
            {key: 'etInpPass', comClass: 'input', type: 'number', label: 'Duración', required: true, name: 'duration'},
            {key: 'etInpPass', comClass: 'input', type: 'number', label: 'Edad mínima', required: true, name: 'minage'}
        ]

        return inputs.map(input => <InputBootstrap key={input.key} componentClass={input.comClass} 
            type={input.type} label={input.label} required={input.required} name={input.name} />);
    }

    render() {
        return (
            <div className="background-light-grey">
                <div className="container">
                    <div className="col-md-8 float-left">
                        <div className="background-white padding-25">
                            <h3>Películas</h3>
                        </div>
                    </div>
                    <div className="col-md-4 float-left">
                        <div className="background-white padding-25">
                            <h3>Crear película</h3>
                            <form>
                                {this.showInputs()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainAdmin;
