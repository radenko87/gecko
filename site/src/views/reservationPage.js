import React, { Component } from 'react';
import Link from '../components/link';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';
import Slider from '../components/slider';
import { Rnd } from 'react-rnd';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import close from '../assets/svg/close_reservation.svg'
import reserved from '../assets/svg/reserved.svg'
import Form from '../components/forms/reservationForm'
import chevron from '../assets/svg/order-chevron.svg'
import moment from 'moment'
import { GoogleLogin } from 'react-google-login';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import google from '../assets/svg/google.svg';
import facebook from '../assets/svg/facebook.svg';


const tables = [
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>

                {/* <svg xmlns="http://www.w3.org/2000/svg" width="74" height="32" viewBox="0 0 74 32">
                    <rect id="Rectangle_298" data-name="Rectangle 298" width="74" height="32" rx="6" fill={color} />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="130" height="56" viewBox="0 0 130 56">
                    <rect id="Rectangle_298" data-name="Rectangle 298" width="130" height="56" rx="20" fill={color} />
                </svg>

                <div className="table-number">{number}</div>

            </div>
        )
    },
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="74" viewBox="0 0 32 74">
                    <rect id="Rectangle_308" data-name="Rectangle 308" width="74" height="32" rx="6" transform="translate(32) rotate(90)" fill={color} />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="130" viewBox="0 0 56 130">
                    <rect id="Rectangle_305" data-name="Rectangle 305" width="56" height="130" rx="20" transform="translate(111) rotate(90)" fill={color} />
                </svg>

                <div className="table-number">{number}</div>

            </div>


        )
    },
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <rect id="Rectangle_299" data-name="Rectangle 299" width="32" height="32" rx="6" fill={color} />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="56" viewBox="0 0 77 79">
                    <rect id="Rectangle_303" data-name="Rectangle 303" width="77" height="79" rx="20" fill={color} />
                </svg>

                <div className="table-number">{number}</div>

            </div>

        )
    },
]

class ReservationPage extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        this.state = {
            ...props.initialData,
            activeIndex: 0,


        };
    }
    responseGoogle = (res) => {
        fetch('http://159.223.28.42:4000/login/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: res.accessToken
            })
        }).then((res) => res.json()).then((response) => {
            if (response.token) {
                fetch('http://159.223.28.42:4000/reservations/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response.token}`
                    },
                    body: JSON.stringify(this.state.reservationObject)
                }).then((res) => res.json()).then((result) => {
                    this.setState({
                        showLogin: null,
                        lightbox2: true,
                        lightbox: null
                    })
                })
            }
        });

    }

    responseFacebook = async (res) => {

        console.log(res);

        fetch('http://159.223.28.42:4000/login/facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: res.accessToken
            })
        }).then((res) => res.json()).then((response) => {
            if (response.token) {
                fetch('http://159.223.28.42:4000/reservations/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response.token}`
                    },
                    body: JSON.stringify(this.state.reservationObject)
                }).then((res) => res.json()).then((result) => {
                    this.setState({
                        showLogin: null,
                        lightbox2: true,
                        lightbox: null
                    })
                })
            }
        });


        return;
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

        let ts1 = Math.floor(data.date.getTime() / 1000);
        let date1 = moment.unix(ts1).format('DD-MM-YYYY');
        let ts2 = Math.floor(data.time.getTime() / 1000)
        let date2 = moment.unix(ts2).format('HH:mm');
        let dateTime = date1 + ' ' + date2;
        console.log("dateTime: " + dateTime);

        let dateTimeParts = dateTime.split(' ');
        let timeParts = dateTimeParts[1].split(':');
        let dateParts = dateTimeParts[0].split('-');
        // console.log("dateParts[2]: " + dateParts[2]);
        // console.log("parseInt(dateParts[1], 10): " + parseInt(dateParts[1], 10));
        // console.log("dateParts[0]: " + dateParts[0]);
        // console.log("timeParts[0]: " + timeParts[0]);
        // console.log("timeParts[1]: " + timeParts[1]);
        let date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
        // console.log("Datum: ", date);
        data.reservationDate = Math.floor(date.getTime() / 1000);


        let obj = {};
        obj.tableId = data._id;
        obj.numberOfPeople = data.numberOfPeople;
        obj.reservationDate = data.reservationDate;

        console.log(obj);

        this.setState({
            reservationObject: obj,
            showLogin: true
        })

        // fetch('http://159.223.28.42:4000/reservations/send', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        //     body: JSON.stringify(obj)
        // }).then((res) => res.json()).then((result) => {
        //     if (result.error) {
        //         this.setState({
        //             error: result.error
        //         })
        //         return;
        //     }
        // })
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.tables.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.tables.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }



    render() {
        let arr = [];
        let maxX = 0;
        if (this.state.tables) {
            for (let i = 0; i < this.state.tables.length; i++) {
                arr.push([this.state.tables[i]])
                if (this.state.tables[i].position.left > maxX) {
                    maxX = this.state.tables[i].position.left;
                }
            }
        }

        console.log(maxX, 1 - (360 / maxX))

        const { activeIndex } = this.state;

        return (
            <div className="page" >
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"Rezervacija stola".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="reservation">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="tables-wrap" style={typeof window !== 'undefined' && window.innerWidth < 768 ? { zoom: 1 - (360 / maxX) } : null}>
                                    {
                                        this.state.tables && this.state.tables.map((item, idx) => {
                                            return (
                                                <Rnd
                                                    enableResizing={false}
                                                    position={{ x: item.position.left * 2, y: item.position.top * 2 }}
                                                    disableDragging
                                                    onClick={() => {
                                                        if (item.status == 0) {
                                                            let index = 0;
                                                            for (let i = 0; i < idx; i++) {
                                                                index += arr[i].length;
                                                            }

                                                            this.setState({ lightbox: true, activeIndex: index })
                                                        }
                                                    }}

                                                >
                                                    {tables[item.type](item.status == 0 ? '#2ECB68' : '#CB2E2E', item.number, () => { })}
                                                </Rnd>

                                            )
                                        })
                                    }

                                </div>
                            </Col>

                            {/* <Col lg="4">
                                <Form onSubmit={this.submit} />
                            </Col>
                            <Col lg="4">
                                <div className="reserve">
                                    <div className="reserve-title">
                                        <h3>STO BROJ 12</h3>
                                        <button className="close-window"><Isvg src={close} /></button>
                                    </div>
                                    <div className="reserved">
                                        <Isvg src={reserved} />
                                    </div>
                                    <div className="reserved-info">
                                        <h2>Vaša rezervacije je primljena!</h2>
                                        <h4>Naš tim će Vas kontaktirati<br /> kako bi potvrdili rezervaciju.</h4>
                                    </div>
                                    <Link lang={this.props.lang} to="/"><button className="button-reserve">POGLEDAJ DEŠAVANJA</button></Link>
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                </section>


                <section className="new-events new-events-margin-top">
                    <Container >
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
                </section>
                {
                    this.state.lightbox ?
                        <div className="lightbox">
                            {/* <div className="close" onClick={() => this.setState({ lightbox: null })}>
                                <Isvg src={close_ico} />
                            </div> */}
                            {

                                this.state.tables && this.state.tables.map((item) => {
                                    return (

                                        <div className="lightbox-item padding350">
                                            <div className="reservation-form">
                                                {!this.state.showLogin ?

                                                    <>
                                                        <div className="reserve-title">
                                                            <h3>{"STO BROJ".translate(this.props.lang)} {Object.get(this.props.initialValues, 'number')}</h3>
                                                            <button type="button" className="close-window" onClick={() => this.setState({ lightbox: null })}><Isvg src={close} /></button>
                                                        </div>
                                                        <h4>{"Vrijeme rezervacije".translate(this.props.lang)}</h4>

                                                        <Form initialValues={this.state.tables[activeIndex]} onSubmit={this.submit} />
                                                    </>
                                                    :
                                                    <>
                                                        <div className="login-buttons">
                                                            <GoogleLogin
                                                                clientId="691281834591-k6pspqd497ib0biiq9bcojo5ur6kajih.apps.googleusercontent.com"
                                                                buttonText="Login"
                                                                onSuccess={this.responseGoogle}
                                                                onFailure={this.responseGoogle}
                                                                cookiePolicy={'single_host_origin'}
                                                                className="login-button"
                                                                render={renderProps => (
                                                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-button"><Isvg src={google} />Anmelden mit Google</button>
                                                                )}
                                                            />

                                                            <FacebookLogin
                                                                appId="582511622697954"
                                                                autoLoad
                                                                callback={this.responseFacebook}
                                                                render={renderProps => (
                                                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-button fb-btn"><Isvg src={facebook} />Anmelden mit Facebook</button>
                                                                )}
                                                            />

                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>

                                    );
                                })
                            }

                        </div>
                        : null
                }
                {
                    this.state.lightbox2 ?
                        <div className="lightbox">
                            {/* <div className="close" onClick={() => this.setState({ lightbox2: null })}>
                                <Isvg src={close_ico} />
                            </div> */}
                            {

                                this.state.tables && this.state.tables.map((item) => {
                                    return (
                                        <div className="lightbox-item padding350">
                                            <div className="reserve">
                                                <div className="reserve-title">
                                                    <h3>{"STO BROJ".translate(this.props.lang)} {Object.get(this.state.tables[activeIndex], 'number')}</h3>
                                                    <button className="close-window" onClick={() => this.setState({ lightbox2: null })}><Isvg src={close} /></button>
                                                </div>
                                                <div className="reserved">
                                                    <Isvg src={reserved} />
                                                </div>
                                                <div className="reserved-info">
                                                    <h2>{"Vaša rezervacije je primljena".translate(this.props.lang)}!</h2>
                                                    <h4>{"Naš tim će Vas kontaktirati".translate(this.props.lang)}<br />
                                                        {" kako bi potvrdili rezervaciju".translate(this.props.lang)}.</h4>
                                                </div>
                                                <Link lang={this.props.lang} to="/veranstaltungen"><button className="button-reserve">{"POGLEDAJ DEŠAVANJA".translate(this.props.lang)}</button></Link>
                                            </div>
                                        </div>

                                    );
                                })
                            }

                        </div>
                        : null
                }
            </div >
        );
    }
}


export default Page(ReservationPage);