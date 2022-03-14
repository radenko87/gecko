
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                {this.props.label ? <label className={this.props.error ? "required" : ""} >{this.props.label}</label> : null}
                <textarea className={this.props.error ? "form-field-area required" : "form-field-area"} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder}></textarea>
            </>

        );
    }
}

export default Textarea;