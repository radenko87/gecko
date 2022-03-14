
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';



class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }






    render() {
        //console.log(this.props)
        //console.log(generateAlias("ćčććasd"))
        return (
                <>
                { this.props.label ? <label className={this.props.error ? "required" : ""}>{this.props.label}</label> : null } 
                <input className={this.props.error ? "form-field required" : "form-field"} type={this.props.type ? this.props.type : 'text'} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder} />
                </>
        );
    }
}

export default Text;