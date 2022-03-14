import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Textarea from './fields/textarea';
import rightChevron from '../../assets/svg/right-chevron.svg';
import Isvg from 'react-inlinesvg';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

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
            <form onSubmit={handleSubmit} className="contact-form">
                <Row>
                    <Col lg="12">
                        <div className="title">
                            <h1>Kontaktirajte nas</h1>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="field-wrap space30">
                            <Field
                                name="firstName"
                                component={renderTextField}
                                placeholder={"Ime".translate(this.props.lang)}
                                validate={[required]}
                            ></Field>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="field-wrap space30">
                            <Field
                                name="lastName"
                                component={renderTextField}
                                placeholder={"Prezime".translate(this.props.lang)}
                                validate={[required]}
                            ></Field>
                        </div>
                    </Col>

                    <Col lg="12">

                        <div className="field-wrap space30">

                            <Field
                                name="email"
                                component={renderTextField}
                                placeholder={"E-mail adresa".translate(this.props.lang)}
                                validate={[required]}
                            ></Field>
                        </div>
                    </Col>

                    <Col lg="12">

                        <div className="field-wrap space20">
                            <Field
                                name="message"
                                component={renderTextareaField}
                                placeholder={"Vaša poruku".translate(this.props.lang)}
                                validate={[required]}
                            ></Field>
                        </div>
                    </Col>

                    <Col lg="12" className="btn-wrap">
                        <button className="button">{'POŠALJI'.translate(this.props.lang)}</button>

                        {/* {this.props.loading ?
                            null
                            :
                            <button className="button">{'POŠALJI'.translate(this.props.lang)}</button>
                        } */}

                    </Col>
                </Row>


            </form>

        )
    }
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
