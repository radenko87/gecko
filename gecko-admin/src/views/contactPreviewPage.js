import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Page from '../containers/page';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class ContactPreviewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        if (!localStorage.token){
            return;
        }

        if (this.props[0].match.params.id) {
            fetch('http://localhost:4000/admin/fetchOne/contacts/' + this.props[0].match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                }
            }).then((res) => res.json()).then((result) => {
                console.log(result);
                this.setState(
                    result
                )
            })

        }

    }

    render() {

        return (
            <div className="page-wrap">
                {
                    !localStorage.token ? <Redirect to='/login' /> : null
                }

                <Container fluid>

                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Kontaktübersicht</h3>
                        </Col>

                    </Row>

                    <Row>
                        <Col lg="12" >
                            <Container fluid className="form-box contact-box">
                                <Row>
                                    <Col lg="6">
                                        <label>NAME</label>
                                        <p>{this.state.firstName} {this.state.lastName}</p>
                                    </Col>
                                 
                                    <Col lg="6">
                                        <label>E-MAIL</label>
                                        <p>{this.state.email}</p>
                                    </Col>
                                    <Col lg="12" className="spacer">
                                        <div></div>
                                    </Col>
                                    <Col lg="12">
                                        <h3 className="title">Message</h3>
                                        <p className="content">
                                            <p>{this.state.message}</p>

                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                </Container>


            </div>
        );
    }
}

export default Page(ContactPreviewPage);