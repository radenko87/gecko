
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
            var reader = new FileReader();

            reader.onload = (e) => {
                this.props.onChange({
                    type: 'image',
                    value: e.target.result
                })
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    render() {
        return (
            <>
                {this.props.label ? <label>{this.props.label}</label> : null}

                <Editor
                    apiKey="4cy398vgi6uz8lt6opj7pby71lhjbzyxe91wcuwlmyvhhze6"
                    init={{ plugins: 'link table code bootstrap-editor', height: 280 }}
                    value={this.props.multilang ? (this.props.value && this.props.value[this.props.lang]) ? this.props.value[this.props.lang] : '' : this.props.value}
                    onEditorChange={(val) => {

                        if (this.props.multilang) {
                            let value = this.props.value;
                            if (!value) {
                                value = {};
                            }
                            value[this.props.lang] = val;

                            this.props.onChange(value);
                        } else {

                            this.props.onChange(val);
                        }
                        this.forceUpdate();


                    }} />

            </>




        );
    }
}

export default HtmlImage;