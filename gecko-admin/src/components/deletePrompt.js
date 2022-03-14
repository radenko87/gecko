import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.jpg';

class DeletePrompt extends Component {

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
                  this.props.handleDeletePrompt(false, this.props.deletePrompt)
            }
      }



      render() {

            return (

                  <div className="prompt-modal">
                        <div ref={(node) => this.wrapperRef = node}>
                              <div className="head"></div>
                              <h3>{this.props.translate('Da li ste sigurni da želite da obrišete?')} <i className="mdi mdi-close" onClick={() => this.props.handleDeletePrompt(false, this.props.deletePrompt)}></i></h3>
                              <div className="spacer"></div>
                              <div className="button-wrap">
                                    <button className="button" onClick={() => this.props.handleDeletePrompt(true, this.props.deletePrompt)}>Da</button>
                                    <button className="button" onClick={() => this.props.handleDeletePrompt(false, this.props.deletePrompt)}>Ne</button>
                              </div>
                        </div>
                  </div>
            )
      }

};

export default DeletePrompt;