import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import { connect } from 'react-redux';
import InputFilePreview from '../inputFilePreview';
import Film from './film';
import upload from '../../upload.png';
import Loader from '../loader';

class MainAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            srcImageCreate: upload,
            listFilms: [],
            isLoad: true
        }
    }

    componentWillMount = () => {
        this.showFilms();
    }

    showFilms = () => {
        fetch(`http://localhost:8000/admin/film/showfilms`, {
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
                    listFilms: jsonResponse,
                    isLoad: false
                });
            }
        });
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
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = e => {
            this.setState({
                srcImageCreate: reader.result
            });
        };
    }

    createFilm = e => {
        e.preventDefault();
        const form = e.target;
        const file  = {
            'type': form.image.files[0].type,
            'tmp_name': this.state.srcImageCreate
        };
        this.setState({
            isLoad: true
        });
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
                    srcImageCreate: upload,
                    errorMessageCreate: null
                });
                this.showFilms();
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }

        return (
            <div style={{paddingTop: '10px'}}>
                <div>
                    {this.state.listFilms.map((film) => {
                        return <Film key={`film${film.id}`} id={film.id} image={`http://localhost:8000/uploads/films/${film.image}`} 
                            name={film.name} description={film.description} minAge={film.minAge} duration={film.duration} genres={film.filmGenres} />;
                    })}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-8 float-left">
                    <div className="width-100 float-left">
                        {this.showElements()}
                    </div>
                </div>
                <div className="col-md-4 float-left">
                    <div className="background-white padding-25" style={{paddingTop: 0}}>
                        <form onSubmit={this.createFilm}>
                            <InputFilePreview src={this.state.srcImageCreate} onChange={this.selectImage} 
                                divClass="horizontal-align-center padding-25" previewClass="max-height-100 margin-bottom-15" inputClass="btn btn-info margin-0" />
                            {this.showInputs()}
                            {null !== this.state.errorMessageCreate ? <label className="text-danger">{this.state.errorMessageCreate}</label>: ''}
                            <ButtonBootstrap btnStyle="info" block={true} type="submit" text="Crear película" />
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

export default connect(mapStateToProps)(MainAdmin);
