import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import { connect } from 'react-redux';
import InputFileDragDrop from '../inputFileDragDrop';

class MainAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            srcImageCreate: null
        }
    }

    showInputs = () => {
        const inputs = [
            {key: 'etInpName', comClass: 'input', type: 'text', label: 'Nombre', required: true, name: 'name'},
            {key: 'etInpDuration', comClass: 'input', type: 'number', label: 'Duración', required: true, name: 'duration'},
            {key: 'etInpMinAge', comClass: 'input', type: 'number', label: 'Edad mínima', required: true, name: 'minage'},
            {key: 'etInpDescription', comClass: 'textarea', type: 'text', label: 'Descripción', required: true, name: 'description'},
        ]

        return inputs.map(input => <InputBootstrap key={input.key} componentClass={input.comClass} 
            type={input.type} label={input.label} required={input.required} name={input.name} />);
    }

    selectImage = e => {
        /*const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = e => {
            this.setState({
                srcImageCreate: reader.result
            });
        };*/
    }

    createFilm = e => {
        e.preventDefault();
        const form = e.target;
        const file  = {
            'type': form.image.files[0].type,
            'tmp_name': this.state.srcImageCreate
         };  
        fetch(`http://localhost:8000/admin/film/create`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                files: {
                    image: file
                },
                request: {
                    name: form.name.value,
                    duration: form.duration.value,
                    minage: form.minage.value,
                    description: form.description.value
                }
            })
        })
        .then(response => {
            this.setState({code: response.status});

            return response.json();
        })
        .then(jsonResponse => {
            if (201 === this.state.code) {
                form.reset();
                this.setState({
                    srcImageCreate: null,
                    errorMessageCreate: null
                });
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    render() {
        return (
            <div className="background-light-grey">
                <div className="container">
                    <div className="col-md-8 float-left">
                        <div className="background-white padding-25">
                            <h5>Películas</h5>
                        </div>
                    </div>
                    <div className="col-md-4 float-left">
                        <div className="background-white padding-25">
                            <h5>Crear película</h5>
                            <form onSubmit={this.createFilm}>
                                <InputFileDragDrop text="Elegir imágen" name="image" onDrop={this.selectImage} extensions={['.jpg', '.jpeg', '.png']} 
                                    fileSize={5242880} preview={true} />
                                {this.showInputs()}
                                {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                                <ButtonBootstrap btnStyle="primary" block={true} type="submit" text="Crear película" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token: state.token,
        hasRedirect: state.hasRedirect
    }
}

export default connect(mapStateToProps)(MainAdmin);
