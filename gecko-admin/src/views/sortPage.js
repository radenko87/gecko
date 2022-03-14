import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';
import Sort from '../components/forms/fields/sort';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';



class SortPage extends Component {
    constructor(props) {
        super(props);
        this.fetchPages = this.fetchPages.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.fetchPages();
    }


    componentDidUpdate(prevProps){
        if (prevProps[0].location.pathname != this.props[0].location.pathname){
            this.fetchPages();
        }
    }

    fetchPages() {
        if (!localStorage.token){
            return;
        }

        this.setState({
            items: []
        }, () => {
            fetch('http://localhost:4000/admin/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res) => res.json()).then((result) => {
                console.log(result);

                let items = [];
                for(let i=0;i<result.length;i++){
                    items.push({
                        image: result[i].info.image,
                        _id: result[i]._id
                    })
                }

                this.setState({
                    items: items
                })
            })
    
        })

    }

    save() {

        fetch('http://localhost:4000/admin/projects/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state.items)
        }).then((res) => res.json()).then((result) => {
            this.props[0].history.push('/')
        })
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
                            <h3>REFERENCE</h3>
                        </Col>
                        <Col lg="12">
                    <Sort value={this.state.items} onChange={(items) => this.setState({items})}></Sort>
                        </Col>
                        <Col lg="12">
                    <button className="button" onClick={this.save}>Spremi</button>

                </Col>

                    </Row>


                </Container>

            </div>
        );
    }
}

export default Page(SortPage);