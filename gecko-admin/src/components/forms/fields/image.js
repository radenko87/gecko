
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

class Image extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {

        };
    }

    selectFile(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            this.setState({
                _loading: true
            })

            let formData = new FormData();
            formData.append('file', input.files[0]);

            fetch('http://localhost:4000/admin/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: formData
            }).then((res) => res.text()).then((img) => {
                this.props.onChange(img);
                this.setState({
                    _loading: null
                })
            });
            
            //var reader = new FileReader();



            /*reader.onload = async (e) => {
                
        
            }

            reader.readAsDataURL(input.files[0]);*/
        }
    }

    render() {
        return (
                        <div className="image-picker single-image-picker">
                            <input type="file" onChange={this.selectFile} />
                            {this.props.value ?
                                <img src={'http://localhost:4000' +this.props.value} />
                                :
                                <div className="no-image">
                                    <Isvg src={ image} />
                                    <span className="text">Choose file</span>
                                    {
                                        this.state._loading ?
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                        :
                                        null
                                    }
                                </div>
                            }
                        </div>


        );
    }
}

export default Image;