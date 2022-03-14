import React from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Check from './fields/check';

import {
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    type
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            type={type}
            error={touched && error}
            {...input}
        />
    )


const form = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (

        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" className="input-wrap">
                    <Field
                        name="username"
                        component={renderTextField}
                        placeholder="Username"
                    ></Field>
                </Col>
                <Col lg="12" className="input-wrap">
                    <Field
                        name="password"
                        component={renderTextField}
                        placeholder="Password"
                        type="password"
                    ></Field>
                </Col>

                <Col lg="12">
                    <button>SIGN IN NOW</button>
                </Col>
            </Row>
        </form>
    )
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
