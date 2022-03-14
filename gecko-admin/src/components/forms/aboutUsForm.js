import React from 'react';
import { Field, reduxForm } from 'redux-form'

import Text from './fields/text';
import Textarea from './fields/textarea';
import Image from './fields/image';
import Html from './fields/html';
import Gallery from './fields/gallery';
import Section from './fields/section';

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
