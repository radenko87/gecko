import React, { Component } from 'react';
import Link from '../components/link';

import Isvg from 'react-inlinesvg';
import Page from '../containers/page';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';




import moment from 'moment';


import ReactPaginate from 'react-paginate';

var striptags = require('striptags');

class EventsPage extends Component {
    constructor(props) {
        super(props);
        this.updateStateFromSearch = this.updateStateFromSearch.bind(this);
        this.updateParam = this.updateParam.bind(this);
        this.get = this.get.bind(this);

        this.state = {
            promotedProjects: [],
            page: 0,
            ...props.initialData
        };
    }

    updateStateFromSearch(callback) {
        let broken = this.props[0].location.search.split('?').pop().split('&');
        let params = { page: 0 };
        for (let i = 0; i < broken.length; i++) {
            if (broken[i].indexOf('=') !== -1) {
                params[broken[i].split('=')[0]] = broken[i].split('=')[1];
            }
        }

        this.setState({
            category: null,
            tag: null,
            items: []
        }, () => {
            this.setState(params, callback);

        })

    }


    updateParam(name, value) {

        let broken = this.props[0].location.search.split('?').pop().split('&');
        let params = {};
        for (let i = 0; i < broken.length; i++) {
            if (broken[i].indexOf('=') !== -1) {
                params[broken[i].split('=')[0]] = broken[i].split('=')[1];
            }
        }

        params[name] = value;

        let paramsArr = [];
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key]) {

                paramsArr.push(key + "=" + params[key]);
            }
        }



        let search = '?' + paramsArr.join('&');


        this.props[0].history.push(this.props[0].location.pathname + search);
        //console.log(search);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps[0].location.search != this.props[0].location.search) {
            this.updateStateFromSearch(() => {
                this.get()
            });
        }
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




        this.updateStateFromSearch(this.get);


    }
    get() {
        fetch('http://localhost:4000/blog', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                page: this.state.page,
                lang: this.props.lang
            })
        }).then(res => res.json()).then((result) => {
            console.log(result);
            this.setState({
                items: result.items,
                total: result.total
            }, () => {
                this.props.updateMeta(this.props.generateSeoTags(this.state, this.props.lang));
            })
        })

    }


    render() {
        console.log(this.state);
        return (
            <div className="page">
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"Vijesti i događaji".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="new-events new-events-margin">
                    <Container >
                        <Row>
                            {
                                this.state.items && this.state.items.map((item, idx) => {
                                    return (
                                        <Col lg="4">
    
                                                <Link lang={this.props.lang} to={`/veranstaltungen/${Object.translate(item, 'alias', this.props.lang)}`}>

                                                    <div className="news-field">
                                                        <div className="news-image">
                                                            <img src={'http://localhost:4000' + Object.get(item, 'image')} />
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
                        {this.state.total / 9 > 1 ?
                                <Row>
                                    <Col lg="12">
                                        <ReactPaginate
                                            previousLabel={''.translate(this.props.lang)}
                                            nextLabel={''.translate(this.props.lang)}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={this.state.total / 9}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                            onPageChange={(page) => { this.updateParam('page', page.selected) }}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                            hrefBuilder={(page) => { return `?page=${page}` }}
                                        //forcePage={this.state.page}
                                        />

                                    </Col>

                                </Row>

                                :

                                null
                            }
                    </Container>
                </section>
            </div>
        );
    }
}

export default Page(EventsPage);