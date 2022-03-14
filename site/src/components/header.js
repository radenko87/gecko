import React, { Component } from 'react';
import Link from './link'

import Isvg from 'react-inlinesvg';


import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Nav, NavItem,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption

} from 'reactstrap';

import facebook from '../assets/svg/fb-icon.svg'
import instagram from '../assets/svg/instagram.svg'
import chevron from '../assets/svg/order-chevron.svg'
import close_icon from '../assets/svg/close-ico.svg'
import dot from '../assets/svg/dot.svg'


import hamburger_icon from '../assets/svg/hamburger-icon.svg'

import logo from '../assets/svg/logo.svg';

import right_plate from '../assets/images/header-right-plate.png'
import left_plate from '../assets/images/header-left-plate.png'

import translateLinkToOrig from '../translateLinkToOrig';

class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };



    }





    componentDidMount() {


    }





    render() {
        return (
            <header>
                <Container>
                    <Row>
                        <Col lg="3" className="logo">
                            <Link lang={this.props.lang} to='/'><Isvg src={logo} /></Link>
                        </Col>
                        <button className="hamburger" onClick={() => { this.setState({ mobileMenu: !this.state.mobileMenu }) }}><Isvg src={hamburger_icon} /></button>

                        <Col lg="9">
                            <div className={this.state.mobileMenu ? "header-fields header-fields-open" : "header-fields"}>
                                <button className="close_menu" onClick={() => { this.setState({ mobileMenu: !this.state.mobileMenu }) }}><Isvg src={close_icon} /></button>
                                <div className="header-links">
                                    <div className="home">
                                        <Link lang={this.props.lang} to="/" className={translateLinkToOrig(this.props[0].location.pathname) == '/' ? 'active-page' : ''}>
                                            {"Početna".translate(this.props.lang)}
                                            <div className="dot">
                                                <Isvg src={dot} />
                                            </div>
                                        </Link>

                                    </div>
                                    <div className="aboutUs">
                                        <Link lang={this.props.lang} to="/uber-uns" className={translateLinkToOrig(this.props[0].location.pathname) == '/uber-uns' ? 'active-page' : ''}>
                                            {"O nama".translate(this.props.lang)}
                                            <div className="dot">
                                                <Isvg src={dot} />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="menu">
                                        <Link lang={this.props.lang} to="/menu" className={translateLinkToOrig(this.props[0].location.pathname) == '/menu' ? 'active-page' : ''}>
                                            {"Jelovnik".translate(this.props.lang)}
                                            <div className="dot">
                                                <Isvg src={dot} />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="events">
                                        <Link lang={this.props.lang} to="/veranstaltungen" className={translateLinkToOrig(this.props[0].location.pathname) == '/veranstaltungen' ? 'active-page' : ''}>
                                            {"Događaji".translate(this.props.lang)}
                                            <div className="dot">
                                                <Isvg src={dot} />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="contact">
                                        <Link lang={this.props.lang} to="/kontakt" className={translateLinkToOrig(this.props[0].location.pathname) == '/kontakt' ? 'active-page' : ''}>
                                            {"Kontakt".translate(this.props.lang)}
                                            <div className="dot">
                                                <Isvg src={dot} />
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="langs">
                                    <a href="/">   {"DE".translate(this.props.lang)}</a>
                                            <a href="/en">   {"EN".translate(this.props.lang)}</a>
                                            <a href="/sr">  {"SR".translate(this.props.lang)}</a>

                                        </div>


                                </div>
                                <div className="header-btns">
                                    <div className="reservation-btn">
                                        <Link lang={this.props.lang} to="/reservation"><button className="reservation-button">{"REZERVIŠITE STO".translate(this.props.lang)}<Isvg src={chevron} /></button></Link>
                                    </div>
                                </div>

                                <div className="header-right">

                                    <div className="language">
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="lang-drop">
                                                {this.props.lang.toUpperCase()}
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8.367" viewBox="0 0 14 8.367">
                                                    <path id="iconfinder_down-arrow-low-below_2075795" d="M12.865,17.633,7,23.5,1.135,17.633,0,18.805,7,26l7-7.195Z" transform="translate(0 -17.633)" fill="#464749" />
                                                </svg>

                                            </DropdownToggle>
                                            <DropdownMenu className="lang-menu">
                                             <a href="/">   <DropdownItem className="drop-item">{"DE".translate(this.props.lang)}</DropdownItem></a>
                                            <a href="/en">    <DropdownItem className="drop-item">{"EN".translate(this.props.lang)}</DropdownItem></a>
                                            <a href="/sr">   <DropdownItem className="drop-item">{"SR".translate(this.props.lang)}</DropdownItem></a>

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <div className="fb"><a href="https://www.facebook.com/Cafe-Bar-Gecko-59105905982/" target="_blank"><Isvg src={facebook} /></a></div>
                                    <div className="inst"><a href="https://www.instagram.com/cafe_bar_gecko/" target="_blank"><Isvg src={instagram} /></a></div>
                                </div>
                            </div>


                        </Col>
                    </Row>
                    {
                        translateLinkToOrig(this.props[0].location.pathname) == '/' ?
                            <div className="plates">
                                <div className="left-home">
                                    <img src={left_plate} />
                                </div>
                            </div>
                            :
                            <div className="plates">
                                <div className="left">
                                    <img src={left_plate} />
                                </div>
                                <div className="right">
                                    <img src={right_plate} />
                                </div>
                            </div>
                    }



                </Container>


            </header>

        );
    }
}


export default HomeHeader;
