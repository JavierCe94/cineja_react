import React, { Component } from 'react';
import InputBootstrap from '../inputBootstrap';
import ButtonBootstrap from '../buttonBootstrap';
import { connect } from 'react-redux';
import InputFilePreview from '../inputFilePreview';
import Film from './film';
import upload from '../../upload.png';
import Loader from '../loader';
import SelectBootstrap from '../selectBootstrap';

class MainAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            errorMessageCreate: null,
            srcImageCreate: upload,
            listFilms: [],
            selectedValue: null,
            isLoad: true
        }
    }

    componentWillMount = () => {
        this.showFilms();
    }

    showFilms = (date = null) => {
        fetch(`http://localhost:8000/admin/film/showfilms`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.token
            },
            body: JSON.stringify({
                request: {
                    date: date
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
                this.showFilms(this.state.selectedValue);
            } else {
                this.setState({
                    errorMessageCreate: jsonResponse
                });
            }
        });
    }

    showFilmsByDate = (e) => {
        this.setState({
            selectedValue: e.target.value,
            isLoad: true
        });
        this.showFilms('' !== e.target.value ? e.target.value : null);
    }

    showSevenDays = () => {
        const date = new Date();
        let listDays = [];
        for (let i = 0; i < 7; i++) {
            listDays.push({value: date.toLocaleDateString().replace('/', '-').replace('/', '-'), text: date.toLocaleDateString()});
            date.setDate(date.getDate() + 1);
        }

        return listDays.map((day) => <option key={`day${day.value}`} value={day.value}>{day.text}</option>);
    }

    showElements = () => {
        if (this.state.isLoad) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <div>
                    <SelectBootstrap withDefault={true} textDefault="día" label={''} onChange={this.showFilmsByDate} 
                        value={null === this.state.selectedValue ? '' : this.state.selectedValue} options={this.showSevenDays} />
                </div>
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
            <div className="container padding-0-max-width-767 block-order">
                <div className="col-md-8 padding-0-max-width-767 float-left order-third">
                    <div className="width-100 float-left">
                        {this.showElements()}
                    </div>
                </div>
                <div className="line-divide order-second"></div>
                <div className="col-md-4 padding-0-max-width-767 float-left order-first">
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
        token: state.token
    }
}

export default connect(mapStateToProps)(MainAdmin);
