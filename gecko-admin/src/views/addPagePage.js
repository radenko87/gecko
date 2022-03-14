import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Page from '../containers/page';

import PageForm from '../components/forms/pageForm';
import BlogForm from '../components/forms/blogForm';
import LocationForm from '../components/forms/locationForm';
import ItemForm from '../components/forms/itemForm';
import CategoryForm from '../components/forms/categoryForm';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import SeoForm from '../components/forms/seoForm';


const forms = {
    'services': PageForm,
    'blog': BlogForm,
    'seo': SeoForm,
    'items': ItemForm,
    'categories': CategoryForm
}

class AddPagePage extends Component {
    constructor(props) {
        super(props);
        this.addPage = this.addPage.bind(this);

        this.state = {
            projectsCategories: [],
            blogCategories: [],
            pages: [],
            categories: []
        };
    }

    addPage(data) {
        console.log(data);

        fetch('http://localhost:4000/admin/updateOne/' + this.props[0].match.params.collection + '/' + this.props[0].match.params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((result) => {
            this.props[0].history.push('/collection/' + this.props[0].match.params.collection)
        })
    }

    componentDidMount() {
        if (this.props[0].match.params.id != 'new') {
            fetch('http://localhost:4000/admin/fetchOne/' + this.props[0].match.params.collection + '/' + this.props[0].match.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                }
            }).then((res) => res.json()).then((result) => {
                this.setState({
                    initialValues: result
                })
                console.log(result);
            })
        }



        fetch('http://localhost:4000/admin/fetch/pages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                pages: result
            })
        })
        fetch('http://localhost:4000/admin/fetch/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                categories: result
            })
        })

    }


    render() {
        if (!this.props[0].match.params.collection){
            return null;
        }
        const Form = forms[this.props[0].match.params.collection];
        return (
            
            <div className="page-wrap">
                {
                    !localStorage.token ? <Redirect to='/login' /> : null
                }

                <Container fluid>

                    <Row className="page-title">
                        <Col lg="12">
                            {this.props[0].match.params.id !== 'new' ? <h3>Izmjeni</h3> : <h3>Dodaj</h3>}
                        </Col>

                    </Row>

                    {this.state.initialValues ?
                        <Form categories={this.state.categories} blogCategories={this.state.blogCategories} projectsCategories={this.state.projectsCategories} pages={this.state.pages} lang={this.props.lang} collection={this.props[0].match.params.collection} initialValues={this.state.initialValues} onSubmit={this.addPage} />
                        :
                        <Form categories={this.state.categories} blogCategories={this.state.blogCategories} projectsCategories={this.state.projectsCategories} pages={this.state.pages} lang={this.props.lang} collection={this.props[0].match.params.collection} onSubmit={this.addPage} />
                    }
                </Container>


            </div>
        );
    }
}

export default Page(AddPagePage);