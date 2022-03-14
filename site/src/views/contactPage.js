import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';



import {
    Container,
    Row,
    Col,

} from 'reactstrap';


import Map from '../components/map';

import ContactForm from '../components/forms/contactForm';
import mailIcon from '../assets/svg/mail.svg';
import phoneIcon from '../assets/svg/phone.svg';
import locationIcon from '../assets/svg/location.svg';

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        this.state = {

        };
    }

    componentDidMount() {

        if (typeof window !== 'undefined') { window.scrollTo(0, 0); }


        for (let i = 0; i < this.props.loadData.length; i++) {
            this.props.loadData[i](window.fetch, this.props.lang, this.props[0].match).then((data) => {
                this.setState({
                    ...data
                }, () => {
                    this.props.updateMeta(this.props.generateSeoTags(this.state, this.props.lang));
                })
            })
        }


    }
    componentDidUpdate(prevProps) {
        if (prevProps[0].location.pathname != this.props[0].location.pathname) {
            if (typeof window !== 'undefined') { window.scrollTo(0, 0); }


            for (let i = 0; i < this.props.loadData.length; i++) {
                this.props.loadData[i](window.fetch, this.props.lang, this.props[0].match).then((data) => {
                    this.setState({
                        ...data
                    }, () => {
                        this.props.updateMeta(this.props.generateSeoTags(this.state, this.props.lang));
                    })
                })
            }
        }

    }

    submit(data) {
        console.log(data);
        this.setState({
            formLoading: true
        }, () => {

            fetch('http://localhost:4000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(
                    data
                )
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    //formLoading: null,
                    formDone: true
                })
            })
        })

    }


    render() {

        return (
            <div className="page">
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"Kontakt".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="contact-page">
                    <Container>
                        <Row>
                            <Col lg="5">
                                <div className="contact-info">
                                    <h3>{"Tu smo za Vas".translate(this.props.lang)}</h3>
                                    <p>
                                        {"Stojimo Vam na raspolaganju za sva pitanja. Možete nas kontaktirati putem telefona ili E-maila ili popunite formu desno.".translate(this.props.lang)}
                                        <br />{"Odgovorićemo Vam u što kraćem roku.".translate(this.props.lang)}
                                    </p>
                                    <hr />
                                    <h4>{"Kontakt informacije".translate(this.props.lang)}</h4>
                                    <div className="contact-field">
                                        <Isvg src={phoneIcon} />
                                        <div className="contact-field-info">
                                            <h5>{"Telefon".translate(this.props.lang)}</h5>
                                            <h6>{Object.translate(this.state.data, 'phoneNumber', this.props.lang)}</h6>
                                        </div>
                                    </div>
                                    <div className="contact-field">
                                        <Isvg src={mailIcon} />
                                        <div className="contact-field-info">
                                            <h5>{"E-mail".translate(this.props.lang)}</h5>
                                            <h6>{Object.translate(this.state.data, 'email', this.props.lang)}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <h4>{"Lokacija".translate(this.props.lang)}</h4>
                                    <div className="contact-field">
                                        <Isvg src={locationIcon} />
                                        <div className="contact-field-info">
                                            <h5>{"Adresa".translate(this.props.lang)}</h5>
                                            <h6>{Object.translate(this.state.data, 'address', this.props.lang)}
                                                <br />{Object.translate(this.state.data, 'place', this.props.lang)}</h6>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="7">
                                <ContactForm lang={this.props.lang} onSubmit={this.submit} />
                            </Col>
                        </Row>
                        <Row>
                            
                            <Map location={this.state.data && this.state.data.coords} {...this.props} />
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

export default Page(ContactPage);