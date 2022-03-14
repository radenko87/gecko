
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

class Tags extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }






    render() {

        return (
            <>
                <label>{this.props.label}</label>
                <TagsInput value={this.props.multilang ? (this.props.value && this.props.value[this.props.lang]) ? this.props.value[this.props.lang] : [] : this.props.value} onChange={(val) => {
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

export default Tags;