import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import Isvg from 'react-inlinesvg';
import newsletter from '../assets/svg/newsletter.svg';


export class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.registerSocketIOEvents = this.registerSocketIOEvents.bind(this);
        this.subscribe = this.subscribe.bind(this);

        this.state = {
            email: ''
        };

    }


    componentDidMount() {
        if (this.props.socketIOClient) {
            this.registerSocketIOEvents();
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.socketIOClient) {
            this.registerSocketIOEvents();
        }

    }

    registerSocketIOEvents() {
        if (this.state._registeredEvents)
            return;

        this.setState({
            _registeredEvents: true
        });

        this.props.socketIOClient.on('subscribeToNewsletter', (data) => {
            this.setState({
                _done: true,
                email: ''
            })
        });



    }

    componentWillUnmount() {
        if (!this.props.socketIOClient) return;
        this.props.socketIOClient.removeAllListeners("subscribeToNewsletter");
        //this.props.socketIOClient.removeAllListeners("fetchProductVariations");

    }


    subscribe() {

        this.props.socketIOClient.emit("subscribeToNewsletter", {email: this.state.email});
    }


    render() {
        return (
            <section className="section-newsletter">
                <div className="bg"><Isvg src={newsletter} /></div>
                <Container>
                    <Row>
                        <Col lg="4" className="title">
                            <h2>
                            PRETPLATITE SE  <span>NA NAŠ NEWSLETTER</span>
                            </h2>
                        </Col>
                        {!this.state._done ?

                            <Col lg={{ offset: 1, size: 7 }}>
                                <input type="text" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} placeholder="Unesite Vašu E-mail adresu" />
                                <button className="button" onClick={this.subscribe}>PRIJAVI SE</button>




                            </Col>
                            :
                            <Col lg={{ offset: 1, size: 7 }}>

                                <p className="text-center text-white">{'Uspješno ste se pretplati na naš newsletter.'}</p>



                            </Col>
                        }
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Newsletter;