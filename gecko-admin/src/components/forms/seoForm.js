import React from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Textarea from './fields/textarea';
import Image from './fields/image';
import Html from './fields/html';
import Gallery from './fields/gallery';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

const required = value => value ? undefined : "Required"

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

const renderGalleryField = ({
    input,
    placeholder,
    label,
    meta: { touched, error },
    lang,
    multilang
}) => (

        <Gallery
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
                <Col lg="6" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">SEO tags</h3>
                                <h6 className="subtitle">Unesite informacije</h6>

                            </Col>

                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="url"
                                    component={renderTextField}
                                    label={"URL"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>
                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="title"
                                    component={renderTextField}
                                    label={"title"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>
                            <Col lg="12" className="input-wrap seo-description">
                                <Field
                                    name="description"
                                    component={renderTextareaField}
                                    label={"description"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>



                        </Row>
                    </Container>
                </Col>
                <Col lg="6" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Facebook</h3>
                                <h6 className="subtitle">Unesite informacije</h6>

                            </Col>
                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="og:image"
                                    component={renderImageField}
                                    placeholder=""
                                ></Field>
                            </Col>


                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="og:url"
                                    component={renderTextField}
                                    label={"og:url"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>
                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="og:type"
                                    component={renderTextField}
                                    label={"og:type"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>
                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="og:title"
                                    component={renderTextField}
                                    label={"og:title"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>
                            <Col lg="12" className="input-wrap">
                                <Field
                                    name="og:description"
                                    component={renderTextField}
                                    label={"og:description"}
                                    placeholder=""
                                    multilang
                                    lang={props.lang}
                                ></Field>
                            </Col>


                        </Row>
                    </Container>
                </Col>

            




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
