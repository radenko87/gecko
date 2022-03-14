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
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Sekcija #1</h3>
                                <h6 className="subtitle">Unesite informacije</h6>
                            </Col>

                            <Col lg="9">
                                <Row>
                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[0].title"
                                            component={renderTextField}
                                            label={"Naslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>

                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[0].subtitle"
                                            component={renderTextareaField}
                                            label={"Podnaslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[0].buttonText"
                                            component={renderTextField}
                                            label={"Button text"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[0].buttonLink"
                                            component={renderTextField}
                                            label={"Button link"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                </Row>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="section[0].image"
                                    component={renderImageField}
                                    placeholder=""
                                    lang={props.lang}
                                ></Field>
                            </Col>

                        </Row>
                    </Container>
                </Col>

                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Sekcija #2</h3>
                                <h6 className="subtitle">Unesite informacije</h6>

                            </Col>



                            <Col lg="9">
                                <Row>
                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[1].title"
                                            component={renderTextField}
                                            label={"Naslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>

                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[1].subtitle"
                                            component={renderTextareaField}
                                            label={"Podnaslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[1].buttonText"
                                            component={renderTextField}
                                            label={"Button text"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[1].buttonLink"
                                            component={renderTextField}
                                            label={"Button link"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                </Row>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="section[1].image"
                                    component={renderImageField}
                                    placeholder=""
                                    lang={props.lang}
                                ></Field>
                            </Col>

                        </Row>
                    </Container>
                </Col>

                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Sekcija #3</h3>
                                <h6 className="subtitle">Unesite informacije</h6>
                            </Col>

                            <Col lg="9">
                                <Row>
                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[2].title"
                                            component={renderTextField}
                                            label={"Naslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>

                                    <Col lg="12" className="input-wrap">
                                        <Field
                                            name="section[2].subtitle"
                                            component={renderTextareaField}
                                            label={"Podnaslov"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}
                                        ></Field>
                                    </Col>
                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[2].buttonText"
                                            component={renderTextField}
                                            label={"Button text"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                    <Col lg="6" className="input-wrap">
                                        <Field
                                            name="section[2].buttonLink"
                                            component={renderTextField}
                                            label={"Button link"}
                                            placeholder=""
                                            multilang
                                            lang={props.lang}

                                        ></Field>


                                    </Col>

                                </Row>
                            </Col>
                            <Col lg="3" className="input-wrap">
                                <Field
                                    name="section[2].image"
                                    component={renderImageField}
                                    placeholder=""
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
