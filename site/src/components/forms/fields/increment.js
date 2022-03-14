
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';



class Increment extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }






    render() {

        return (
            <>
                {this.props.label ? <label className={this.props.error ? "increment-label" : "increment-label"}>{this.props.label}</label> : null}
                <div className="inc">
                    <button type="button" className="decrement-btn" onClick={() => {
                        if(this.props.value - 1 > 0){
                            this.props.onChange(Number(this.props.value) - 1);
                        }
                    }}>-</button>
                    <input className={this.props.error ? "increment-field" : "increment-field"} type={this.props.type ? this.props.type : 'text'} onChange={this.props.onChange} value={this.props.value ? this.props.value : 0} placeholder={this.props.placeholder} disabled={this.props.disabled}/>
                    <button type="button" className="decrement-btn" onClick={() => {
                        
                            this.props.onChange(Number(this.props.value) + 1);
                        
                    }}>+</button>
                </div>
            </>
        );
    }
}

export default Increment;