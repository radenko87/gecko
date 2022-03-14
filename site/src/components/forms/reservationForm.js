import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';


import Textarea from './fields/textarea';
import rightChevron from '../../assets/svg/right-chevron.svg';
import Isvg from 'react-inlinesvg';
import close from '../../assets/svg/close_reservation.svg'
import Date from './fields/date_time';
import Time from './fields/time';
import Increment from './fields/increment';



import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

const renderDateField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
}) => (

        <Date
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />

    )
const renderTimeField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
}) => (

        <Time
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />

    )

const renderTextField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    type
}) => (

        <Text
            placeholder={placeholder}
            errorText={touched && error}
            label={label}
            error={touched && error}
            type={type}
            {...input}
        />
    )
const renderIncrementField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    disabled,
    type
    
}) => (

        <Increment
            placeholder={placeholder}
            errorText={touched && error}
            label={label}
            error={touched && error}
            type={type}
            disabled={disabled}
            {...input}
            
        />
    )

const renderTextareaField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
}) => (

        <Textarea
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            {...input}
        />
    )


class form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {

        const { handleSubmit, pristine, reset, submitting } = this.props;
        console.log(pristine, submitting);

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    {/* <Col lg="12">
                        <div className="reserve-title">
                            <h3>{"STO BROJ".translate(this.props.lang)} {Object.get(this.props.initialValues, 'number')}</h3>
                            <button type="button" className="close-window"><Isvg src={close} /></button>
                        </div>
                        <h4>{"Vrijeme rezervacije".translate(this.props.lang)}</h4>
                    </Col> */}
                    <Col lg="6">
                        <Field
                            name="date"
                            label={"Datum".translate(this.props.lang)}
                            component={renderDateField}
                            validate={[required]}
                        ></Field>
                    </Col>
                    <Col lg="6">
                        <Field
                            name="time"
                            label={"Sat".translate(this.props.lang)}
                            component={renderTimeField}
                            validate={[required]}
                        ></Field>
                    </Col>
                    <Col lg="12">
                        <div className="field-wrap space25">
                        <Field
                            name="numberOfPeople"
                            component={renderIncrementField}
                            label={"Broj osoba".translate(this.props.lang)}
                            validate={[required]}
                            disabled
                        >
                        </Field>
                        </div>
                    </Col>


                    <Col lg="12">
                        <button className="button-reserve">{'REZERVIŠI'.translate(this.props.lang)}</button>
                    </Col>
                </Row>


            </form>

        )
    }
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
