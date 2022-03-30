import React, { Component } from 'react';
import Link from '../components/link';

import Isvg from 'react-inlinesvg';
import Page from '../containers/page';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
    Container,
    Row,
    Col,

} from 'reactstrap';

import chevron from '../assets/svg/order-chevron.svg'
import rightChevron from '../assets/svg/right-arrow.svg'
import moment from 'moment';
import Slider from "react-slick";


var striptags = require('striptags');

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state = {
            ...props.initialData
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
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }


    render() {

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3,
            slidesToScroll: 1,
            arrows: false,
            className: 'slider',
            // autoplay: true,
            // autoplaySpeed: 1000,
        };

        return (
            <div className="page">
                <Container className="home-title">
                    <Row>
                        <Col lg="5" xs="5">
                            <div className="home-title">
                                <h5>{"DOBRODOŠLI".translate(this.props.lang)}</h5>
                                <h1>{Object.translate(this.state.data, 'section[0].title', this.props.lang)}</h1>
                                <p>{Object.translate(this.state.data, 'section[0].subtitle', this.props.lang)}</p>
                                <div className="mob-btn">
                                    <Link lang={this.props.lang} to={Object.translate(this.state.data, 'section[0].buttonLink', this.props.lang)}>
                                        <button className="button">{Object.translate(this.state.data, 'section[0].buttonText', this.props.lang)}<Isvg src={chevron} /></button>
                                    </Link>
                                </div>
                            </div>
                            <button className="vertical-btn"><Isvg src={chevron} />{"PREPORUČUJEMO".translate(this.props.lang)}</button>
                        </Col>
                        <Col lg="7" xs="7">
                            <div className="home-image">
                                <img src={'http://159.223.28.42:4000' + Object.get(this.state.data, 'section[0].image')} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="home-menu">

                    <Row>
                        <Col lg="6">
                            <h3>{"IZDVAJAMO IZ MENIJA".translate(this.props.lang)}</h3>
                        </Col>
                        <Col lg="6">
                            <div className="next">
                                <button className="button" onClick={this.previous}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.95" height="16.969" viewBox="0 0 17.95 16.969" >
                                        <path id="Union_69" data-name="Union 69" d="M425,4168.485l8.486-8.484,1.414,1.414-6.072,6.07h14.121v2H428.828l6.072,6.071-1.414,1.414Z" transform="translate(-425 -4160.001)" fill="#000000" />
                                    </svg>
                                </button>
                                <button className="button" onClick={this.next}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.95" height="16.969" viewBox="0 0 17.95 16.969">
                                        <path id="Union_71" data-name="Union 71" d="M0,8.485,8.485,0,9.9,1.414,3.829,7.485H17.95v2H3.829L9.9,15.556,8.485,16.969Z" transform="translate(17.95 16.969) rotate(180)" fill="#000000" />
                                    </svg>
                                </button>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <Slider ref={c => (this.slider = c)} {...settings}>
                                {
                                    this.state.items && this.state.items.map((item, idx) => {
                                        if (item.isPromoted)
                                            return (
                                                <div className="offer-wrap">
                                                    <Link lang={this.props.lang} to="/menu" lang={this.props.lang}>
                                                        <div className="offer">
                                                            <div className="offer-image">
                                                                <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')} />
                                                            </div>
                                                            <div className="offer-text">
                                                                <h5>{Object.translate(item, 'name', this.props.lang)}</h5>
                                                                <h6>{Object.get(item, 'price')} €</h6>
                                                            </div>
                                                            <div className="offer-link">
                                                                <Isvg src={rightChevron} />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                    })
                                }

                            </Slider>

                        </Col>


                    </Row>
                    <Row>
                        <Col lg="7"  xs="7">
                            <div className="plate">
                                <img src={'http://159.223.28.42:4000' + Object.get(this.state.data, 'section[1].image')} />
                            </div>

                        </Col>
                        <Col lg="5" xs="12">
                            <div className="event">
                                <h2>{Object.translate(this.state.data, 'section[1].title', this.props.lang)}</h2>
                                <p>
                                    {Object.translate(this.state.data, 'section[1].subtitle', this.props.lang)}
                                </p>
                                <div className="mob-btn">
                                    <Link lang={this.props.lang} to={Object.translate(this.state.data, 'section[1].buttonLink', this.props.lang)}>
                                        <button className="button">{Object.translate(this.state.data, 'section[1].buttonText', this.props.lang)} <Isvg src={chevron} /></button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="our-menu">
                    <Row>
                        <Col lg="12">
                            <div className="title">
                                <h2>{"Pregledajte naš Meni".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12" className="menu-fields">
                            {
                                this.state.categories && this.state.categories.map((item, idx) => {
                                    return (
                                        <div className="menu-field">
                                            <Link lang={this.props.lang} to="/menu">
                                                <div className="menu-image">
                                                    <Isvg src={'http://159.223.28.42:4000' + Object.get(item, 'image')} />
                                                </div>

                                                <div className="field-text">
                                                    <h5>{Object.translate(item, 'name', this.props.lang)} <Isvg src={rightChevron} /></h5>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }

                        </Col>
                    </Row>
                </Container>
                <Container className="home-reservation">
                    <Row >
                        <Col lg={{size: 5, order: 0}} xs={{size: 12, order: 1}}>
                            <div className="reservation">
                                <h1>{Object.translate(this.state.data, 'section[2].title', this.props.lang)}</h1>
                                <p>
                                    {Object.translate(this.state.data, 'section[2].subtitle', this.props.lang)}
                                </p>
                                <div className="mob-btn">
                                    <Link lang={this.props.lang} to={Object.translate(this.state.data, 'section[2].buttonLink', this.props.lang)}>
                                        <Link lang={this.props.lang} to="/reservation"><button className="button">{Object.translate(this.state.data, 'section[2].buttonText', this.props.lang)} <Isvg src={chevron} /></button></Link>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg={{ size: 6, offset: 1, order: 1 }}  xs={{size: 7, offset: 0, order: 0}}>
                            <div className="plate">
                                <img src={'http://159.223.28.42:4000' + Object.get(this.state.data, 'section[2].image')} />
                            </div>
                        </Col>
                    </Row>

                </Container>
                <Container className="new-events new-events-margin-top">
                    <Row>
                        <Col lg="12">
                            <div className="title">
                                <h2>{"Vijesti i događaji".translate(this.props.lang)}</h2>
                                <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.state.latestBlog && this.state.latestBlog.map((item, idx) => {
                                return (
                                    <Col lg="4">
                                        <Link lang={this.props.lang} to={`/veranstaltungen/${Object.translate(item, 'alias', this.props.lang)}`}>
                                            <div className="news-field">
                                                <div className="news-image">
                                                    <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')} />
                                                </div>
                                                <div className="news-info">
                                                    <h5>{Object.translate(item, 'title', this.props.lang)}</h5>
                                                    <h6>{moment.unix(item && item.timestamp).format('DD.MMMM.YYYY.  |  HH:mm')}</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                    <Row>
                        <Col lg="12">
                            <div className="news-btn">
                                <Link lang={this.props.lang} to="/veranstaltungen">
                                    <button className="button">{"SVE VIJESTI".translate(this.props.lang)}<Isvg src={chevron} /></button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>


            </div >
        );
    }
}

export default Page(HomePage);