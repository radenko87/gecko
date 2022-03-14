import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.jpg';

class Prompt extends Component {

      constructor(props) {
            super(props);
            this.handleClickOutside = this.handleClickOutside.bind(this);

            this.state = {
                text: ''
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
                              <h3>{this.props.prompt.text} <i className="mdi mdi-close" onClick={() => this.props.handlePrompt(null)}></i></h3>
                              <div className="input-wrap">
                                <input value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} type="text" />
                              </div>
                              <div className="button-wrap">
                                    <button className="button" onClick={() => {this.props.prompt.callback(this.state.text); this.props.handlePrompt(null);} }>{this.props.translate('Speichern')}</button>
                              </div>
                        </div>
                  </div>
            )
      }

};

export default Prompt;