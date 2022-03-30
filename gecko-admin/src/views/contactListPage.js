import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';


import visitIcon from '../assets/svg/visit.svg';
import deleteIcon from '../assets/svg/delete.svg';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class ContactListPage extends Component {
    constructor(props) {
        super(props);
        this.deletePage = this.deletePage.bind(this);
        this.fetchPages = this.fetchPages.bind(this);


        this.state = {
            items: []
        };
    }

    componentDidMount() {
       this.fetchPages();


    }

    fetchPages(){
        if (!localStorage.token){
            return;
        }

        fetch('http://159.223.28.42:4000/admin/fetch/contacts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                items: result
            })
        })


    }

    deletePage(id){
        if (!localStorage.token){
            return;
        }

        fetch('http://159.223.28.42:4000/admin/delete/contacts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.fetchPages())
    }
    render() {

        return (
            <div className="page-wrap">
                            {
                    !localStorage.token ? <Redirect to='/login' /> : null
                }

                <Container fluid className="table">

                    <Row className="page-title">
                        <Col lg="12">
                            <h3>Alle Kontakte</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="4">
                            <span className="name">NAME</span>
                        </Col>

                        <Col lg="4">
                            <span className="name">E-MAIL</span>
                        </Col>
                        <Col lg="4" className="actions">

                            <span className="name">OPTIONEN</span>
                        </Col>

                    </Row>
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row">
                                    <Col lg="4">
                                        <span className="value">{item.firstName} {item.lastName}</span>
                                    </Col>
                                    <Col lg="4">
                                        <span className="value">{item.email}</span>
                                    </Col>
                                    <Col lg="4" className="actions">
                                        <Link lang={this.props.lang} to={`/contacts/${item._id}`}><Isvg src={visitIcon} /></Link>
                                        <button onClick={() => this.deletePage(item._id)}><Isvg src={deleteIcon} /></button>

                                    </Col>

                                </Row>

                            )
                        })
                    }

                </Container>



            </div>
        );
    }
}

export default Page(ContactListPage);