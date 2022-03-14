import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.jpg';

class MessageBox extends Component {

    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {

        };
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.handleClose();
        }
    }



    render() {

        return (

            <div className="prompt-modal">
                <div ref={(node) => this.wrapperRef = node}>
                    <div className="head"></div>
                    <h3>{this.props.message} <i className="mdi mdi-close" onClick={() => this.props.handleClose()}></i></h3>
                    <div className="spacer"></div>
                    <div className="button-wrap">
                        <button className="button" onClick={() => this.props.handleClose()}>OK</button>
                    </div>
                </div>
            </div>
        )
    }

};

export default MessageBox;