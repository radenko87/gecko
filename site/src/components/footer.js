import React, { Component } from 'react';
import Link from './link';
import { connect } from 'react-redux';

import Isvg from 'react-inlinesvg';

import {
    Container,
    Row,
    Col,

} from 'reactstrap';



import logo from '../assets/svg/logo.svg';
import googlePlay from '../assets/svg/google-play.svg';
import appStore from '../assets/svg/appstore.svg';

import fb_icon from '../assets/svg/facebook-icon.svg';
import instagram_icon from '../assets/svg/instagram-icon.svg';

import footerImage from '../assets/images/footer-image.png';
import footerImage2 from '../assets/images/footer-image2.png';

import mail_icon from '../assets/svg/mail-ico.svg';
import location_icon from '../assets/svg/location-ico.svg';


export class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        return (
            <footer>

                <Container >
                    <Row className="footer-info">
                        <Col lg="5">
                            <div className="ftr-info">
                                <h4>{"NAŠE APLIKACIJE".translate(this.props.lang)}</h4>
                                <h3>{"Preuzmite Android i iOS Aplikacije".translate(this.props.lang)}</h3>
                                <div className="mob-apps">
                                    <div className="google-play"><Isvg src={googlePlay} /></div>
                                    <div><Isvg src={appStore} /></div>

                                </div>
                            </div>
                        </Col>
                        <Col lg="7">
                            <div className="images-wrap">
                                <div className="footer-image">
                                    <img src={footerImage} />
                                </div>
                                {/* <div className="footer-image2">
                                    <img src={footerImage2}/>
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>


                <Container>
                    <Row>
                        <Col lg="4">
                            <Row className="titles">
                                <Col lg="12">
                                    <Isvg src={logo} />
                                </Col>
                            </Row>
                            <Row className="fields">
                                <Col lg="9">

                                    <p>
                                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.".translate(this.props.lang)}
                                </p>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg="4">
                            <Row className="titles">
                                <Col lg="12">
                                    <span>{"NAVIGACIJA".translate(this.props.lang)}</span>
                                </Col>
                            </Row>
                            <Row className="fields">
                                <Col lg="5">
                                    <div className="links">
                                        <Link lang={this.props.lang} to="/">{"Početna".translate(this.props.lang)}</Link>
                                        <Link lang={this.props.lang} to="/uber-uns">{"O nama".translate(this.props.lang)}</Link>
                                        <Link lang={this.props.lang} to="/menu">{"Jelovnik".translate(this.props.lang)}</Link>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="links">
                                        <Link lang={this.props.lang} to="/veranstaltungen">{"Događaji".translate(this.props.lang)}</Link>
                                        <Link lang={this.props.lang} to="/kontakt">{"Kontakt".translate(this.props.lang)}</Link>
                                        <Link lang={this.props.lang} to="/reservation">{"Rezervacija stola".translate(this.props.lang)}</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="2">
                            <Row className="titles">
                                <Col lg="12">
                                    <span>{"RADNO VRIJEME".translate(this.props.lang)}</span>
                                </Col>
                            </Row>
                            <Row className="fields">
                                <Col lg="12">
                                    <div className="shift">
                                        <h5>{"PON - PET".translate(this.props.lang)}</h5>
                                        <h6>08:00 - 22:00</h6>
                                    </div>
                                    <div className="shift">
                                        <h5>{"SUB-NED".translate(this.props.lang)}</h5>
                                        <h6>08:00 - 20:00</h6>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="2" className="follow-us">
                            <Row className="titles">
                                <Col lg="12">
                                    <span>{"PRATITE NAS".translate(this.props.lang)}</span>
                                </Col>
                            </Row>
                            <Row className="fields">
                                <Col lg="12">
                                    <div className="shift">
                                    <a href="https://www.instagram.com/cafe_bar_gecko/" target="_blank"><h5 className="underline">FACEBOOK</h5></a>
                                    </div>
                                    <div className="shift">
                                        <a href="https://www.facebook.com/Cafe-Bar-Gecko-59105905982/" target="_blank"><h5 className="underline">INSTAGRAM</h5></a>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <hr className="footer-hr" />
                    <div className="copyright">
                        <p>Copyright © GECKO - Sajtović Gastronomie & Event  - 2020. All Rights Reserved.</p>
                        <p>Created by <span><a href="https://www.novamedia.agency">nova media.</a></span></p>
                    </div>
                </Container>

            </footer>
        )
    }
}

export default Footer;