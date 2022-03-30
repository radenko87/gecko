
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import Isvg from 'react-inlinesvg';
import image from '../../../assets/svg/image.svg';
import { Editor } from '@tinymce/tinymce-react';

class HtmlImage extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {

        };
    }

    selectFile(e) {
        let input = e.target;
        if (input.files && input.files[0]) {


            let formData = new FormData();
            formData.append('file', input.files[0]);

            this.setState({
                _loading: true
            })
            fetch('http://159.223.28.42:4000/admin/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: formData
            }).then((res) => res.text()).then((img) => {
                this.props.onChange({
                    type: 'image',
                    value: img
                })
                this.setState({
                    _loading: null
                })
            });

        }
    }

    render() {
        console.log(this.props.value)
        return (
            <>
                <Col lg="12" className="input-wrap">

                    <div className="radio-wrap" onClick={() => this.props.onChange({ type: 'html', value: this.props.multilang ? {} : '' })}>
                        <div className={(this.props.value && this.props.value.type == 'html') || !this.props.value ? 'radio selected' : 'radio'}></div>
                        <span className="radio-label">Tekst</span>
                    </div>

                    <div className="radio-wrap" onClick={() => this.props.onChange({ type: 'image', value: null })}>
                        <div className={this.props.value && this.props.value.type == 'image' ? 'radio selected' : 'radio'}></div>
                        <span className="radio-label">Slika</span>
                    </div>

                </Col>
                {this.props.value && this.props.value.type == 'image' ?
                    <Col lg="12" className="input-wrap">
                        <div className="image-picker">
                            <input type="file" onChange={this.selectFile} />
                            {this.props.value && this.props.value.value ?
                                <img src={this.props.value.value} />
                                :
                                <div className="no-image">
                                    <Isvg src={image} />
                                    <span className="text">Izaberite sliku</span>
                                    {
                                        this.state._loading ?
                                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                            :
                                            null
                                    }

                                </div>
                            }
                        </div>

                    </Col>

                    :
                    <Col lg="12" className="input-wrap">
                        <Editor
                            apiKey="4cy398vgi6uz8lt6opj7pby71lhjbzyxe91wcuwlmyvhhze6"
                            init={{ plugins: 'link table code', height: 280 }}
                            value={this.props.multilang ? (this.props.value && this.props.value.value && this.props.value.value[this.props.lang]) ? this.props.value.value[this.props.lang] : '' : this.props.value.value}
                            onEditorChange={(val) => {

                                if (this.props.multilang) {
                                    let value = this.props.value.value;
                                    if (!value) {
                                        value = {};
                                    }
                                    value[this.props.lang] = val;

                                    this.props.onChange({
                                        type: 'html',
                                        value: value
                                    });
                                } else {

                                    this.props.onChange({
                                        type: 'html',
                                        value: val
                                    })
                                }


                            }}
                        />


                    </Col>

                }




            </>
        );
    }
}

export default HtmlImage;