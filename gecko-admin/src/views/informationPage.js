import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Page from '../containers/page';

import Form from '../components/forms/locationForm';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class InformationPage extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);

        this.state = {
        };
    }


    componentDidMount() {
        if (!localStorage.token){
            return;
        }

        fetch('http://localhost:4000/admin/information', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            }
        }).then((res) => res.json()).then((result) => {
            this.setState({
                initialValues: result
            })
        })
    }

    save(data) {
        if (!localStorage.token){
            return;
        }

        fetch('http://localhost:4000/admin/information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log('redirect')
            // this.props[0].history.push('/');
        })

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
                            <h3>INFORMACIJE</h3>
                        </Col>

                    </Row>
                    {this.state.initialValues ?
                        <Form lang={this.props.lang} initialValues={this.state.initialValues} onSubmit={this.save} />
                        :
                        <Form lang={this.props.lang} onSubmit={this.save} />

                    }

                </Container>


            </div>
        );
    }
}

export default Page(InformationPage);