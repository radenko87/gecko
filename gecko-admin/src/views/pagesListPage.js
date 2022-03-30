import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';

import editIcon from '../assets/svg/edit.svg';
import deleteIcon from '../assets/svg/delete.svg';
import bell from '../assets/svg/bell.svg';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';


const collections = {
    'blogCategories': {
        name: 'name',
        multilang: true
    },
    'projectsCategories': {
        name: 'name',
        multilang: true
    },
    'projects': {
        name: 'info.title',
        multilang: true
    },
    'services': {
        name: 'name',
        multilang: true
    },

    'blog': {
        multilang: true,
        name: 'title'
    },
    'seo': {
        multilang: true,
        name: 'url'
    },
    'pages': {
        name: 'name',
        multilang: true
    },
    'locations': {
        name: 'name',
        multilang: true
    },
    'videos': {
        name: 'name',
        multilang: true
    },
    'categories': {
        name: 'name',
        multilang: true
    },
    'items': {
        name: 'name',
        multilang: true
    }

}

Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

class PagesListPage extends Component {
    constructor(props) {
        super(props);
        this.fetchPages = this.fetchPages.bind(this);
        this.deletePage = this.deletePage.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.fetchPages();
    }


    componentDidUpdate(prevProps) {
        if (prevProps[0].location.pathname != this.props[0].location.pathname) {
            this.fetchPages();
        }
    }

    fetchPages() {
        if (!localStorage.token) {
            return;
        }

        this.setState({
            items: []
        }, () => {
            fetch('http://159.223.28.42:4000/admin/fetch/' + this.props[0].match.params.collection, {
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

        })

    }

    deletePage(id) {
        if (!localStorage.token) {
            return;
        }

        fetch('http://159.223.28.42:4000/admin/delete/' + this.props[0].match.params.collection + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        }).then((res) => this.fetchPages())
    }

    sendNotification(id) {
        if (!localStorage.token) {
            return;
        }

        fetch('http://159.223.28.42:4000/admin/newsNotification/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
        });
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
                            <h3>LISTA</h3>
                        </Col>
                    </Row>
                    <Row className="table-head">
                        <Col lg="10">
                            <span className="name">NAZIV</span>
                        </Col>
                        <Col lg="2" className="actions">

                            <span className="name">OPCIJE</span>
                        </Col>

                    </Row>
                    {
                        this.props[0].match.params.collection && this.state.items.map((item, idx) => {
                            return (
                                <Row className="table-row" key={idx}>
                                    <Col lg="9">
                                        <span className="value">{collections[this.props[0].match.params.collection].multilang ? Object.byString(item, collections[this.props[0].match.params.collection].name) && Object.byString(item, collections[this.props[0].match.params.collection].name)[this.props.lang] : Object.byString(item, collections[this.props[0].match.params.collection].name)}</span>
                                    </Col>
                                    <Col lg="3" className="actions">
                                        {this.props[0].match.params.collection == 'blog' ?
                                            <button onClick={() => this.sendNotification(item._id)}><Isvg src={bell} /></button>
                                            :
                                            null
                                        }

                                        <Link lang={this.props.lang} to={`/collection/${this.props[0].match.params.collection}/${item._id}`}><Isvg src={editIcon} /></Link>
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

export default Page(PagesListPage);