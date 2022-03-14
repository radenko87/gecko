import React from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Textarea from './fields/textarea';
import Image from './fields/image';
import Html from './fields/html';
import Section from './fields/section';
import Tags from './fields/tags';
import Select from './fields/select';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

const renderSelectField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    children,
    additionalAction,
    scope,
}) => (

        <Select
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            additionalAction={additionalAction}
            scope={scope}
            {...input}
            children={children}
        />
    )
const renderTagsField = ({
    input,
    placeholder,
    label,
    multilang,
    lang,
    meta: { touched, error },
}) => (

        <Tags
            placeholder={placeholder}
            label={label}
            multilang={multilang}
            lang={lang}
            errorText={touched && error}
            error={touched && error}

            {...input}
        />
    )

const renderTextField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    lang,
    multilang
}) => (

        <Text
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            multilang={multilang}
            lang={lang}

            {...input}
        />
    )
const renderTextareaField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    lang,
    multilang

}) => (

        <Textarea
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            multilang={multilang}
            lang={lang}

            {...input}
        />
    )

const renderHtmlField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    lang,
    multilang

}) => (

        <Html
            placeholder={placeholder}
            label={label}
            errorText={touched && error}
            error={touched && error}
            multilang={multilang}
            lang={lang}

            {...input}
        />
    )

const renderImageField = ({
    input,
    placeholder,
    meta: { touched, error },
}) => (

        <Image
            placeholder={placeholder}
            errorText={touched && error}
            error={touched && error}

            {...input}
        />
    )

    const renderSectionField = ({
        input,
        placeholder,
        label,
        meta: { touched, error },
        lang,
        multilang
    }) => (
    
            <Section
                placeholder={placeholder}
                label={label}
                errorText={touched && error}
                error={touched && error}
                lang={lang}
                multilang={multilang}
                {...input}
            />
        )
    
const form = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    console.log(pristine, submitting);

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Stranice</h3>
                                <h6 className="subtitle">Unesite informacije</h6>

                            </Col>

                            <Col lg="9">
                                <Row>
                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="name"
                                            component={renderTextField}
                                            label={"Naziv"}
                                            placeholder=""
                                            lang={props.lang}
                                            multilang
                                        ></Field>
                                    </Col>
                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="shortDescription"
                                            component={renderTextareaField}
                                            label={"Kratak opis"}
                                            placeholder=""
                                            lang={props.lang}
                                            multilang
                                        ></Field>
                                    </Col>

                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="category"
                                            component={renderSelectField}
                                            label={"Kategorija"}
                                            placeholder=""
                                        

                                        >
                                            
                                                        <option value={0}>SERVIS</option>
                                                        <option value={1}>USLUGA</option>

                                              

                                        </Field>


                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="3" className="input-wrap">

                                <Field
                                    name="image"
                                    component={renderImageField}

                                ></Field>
                            </Col>

                        </Row>
                    </Container>
                </Col>




                <Field
                    name="content"
                    component={renderSectionField}
                    placeholder=""
                    multilang
                    lang={props.lang}
                ></Field>



                <Col lg="12">
                    <button className="button">Spremi</button>

                </Col>

            </Row>

        </form>
    )
}

export default reduxForm({
    form: 'form'  // a unique identifier for this form
})(form)
