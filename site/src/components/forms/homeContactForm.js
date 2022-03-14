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
            <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                    <Field
                        name="name"
                        component={renderTextField}
                        label={"VAŠE IME".translate(this.props.lang)}
                        placeholder={"Unesite Vaše puno ime".translate(this.props.lang)}
                        validate={[required]}
                    ></Field>
                </div>
                <div className="field-wrap">
                    <Field
                        name="phoneNumber"
                        component={renderTextField}
                        label={"VAŠ TELEFON".translate(this.props.lang)}
                        placeholder={"Unesite broj telefona".translate(this.props.lang)}
                        validate={[required]}
                    ></Field>
                </div>
                <div className="field-wrap">

                    <Field
                        name="email"
                        component={renderTextField}
                        label={"VAŠ E-MAIL".translate(this.props.lang)}
                        placeholder={"Unesite Vašu E-mail adresu".translate(this.props.lang)}
                        validate={[required]}
                    ></Field>
                </div>
                <div className="field-wrap">



                    <Field
                        name="message"
                        component={renderTextareaField}
                        label={"VAŠA PORUKA".translate(this.props.lang)}
                        placeholder={"Unesite Vašu poruku".translate(this.props.lang)}
                        validate={[required]}
                    ></Field>
                </div>
                {this.props.loading ?
                    null
                    :
                    <button className="button">{'POŠALJI PORUKU'.translate(this.props.lang)}</button>
                }


            </form>

        )
    }
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
