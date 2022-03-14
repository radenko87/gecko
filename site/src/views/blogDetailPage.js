import React, { Component } from 'react';
import Link from '../components/link';
import Page from '../containers/page';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import moment from 'moment';

class BlogDetailPage extends Component {
    constructor(props) {
        super(props);

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



    render() {

        return (
            <div className="page">
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"Vijesti i događaji".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit22222".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="event-detail">
                    <Container>
                        <Row>
                            <Col lg="8">
                                <div className="detail">
                                    <div className="title">
                                        <h1>{Object.translate(this.state.data, 'title', this.props.lang)}</h1>
                                        <h6>{moment.unix(this.state.data && this.state.data.timestamp).format('DD.MMMM.YYYY.  |  HH:mm')}</h6>
                                    </div>
                                    <div className="image">
                                        {/* <img src={news} /> */}
                                        <img src={'http://localhost:4000' + Object.get(this.state.data, 'image')} />
                                    </div>
                                    <div className="content">
                                        <p>
                                            {Object.translate(this.state.data, 'content', this.props.lang)}
                                        </p>
                                    </div>

                                </div>
                            </Col>

                            <Col lg="4">
                                <div className="latest-news">
                                    <h3>{"Latest News".translate(this.props.lang)}</h3>
                                    <div className="items">
                                        {
                                            this.state.latestBlog && this.state.latestBlog.map((item, idx) => {
                                                return (
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
                                                )
                                            })
                                        }
                                                                           
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>


            </div>
        );
    }
}

export default Page(BlogDetailPage);