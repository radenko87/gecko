import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';
import pick from '../../../assets/svg/pick.svg'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class DateTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date()
        };
    }


    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    toggle = () => {
        this.component.setOpen(this.focus);
        this.focus = !this.focus;
    }




    render() {

        return (
            <div className="datetime-wrapper">
                {this.props.label ? <label className="label-field">{this.props.label}</label> : null}


                <div className="pick">
                    <DatePicker

                        onChange={this.props.onChange}
                        selected={this.props.value}
                        showTimeSelect
                        showTimeSelectOnly
                        // dateFormat= "Pp"
                        id={this.props.id}
                        className="datepicker"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                    />
                    {/* <button className="pick-btn"><Isvg src={pick} /></button> */}
                    </div>

            </div>
        );
    }
}

export default DateTime;