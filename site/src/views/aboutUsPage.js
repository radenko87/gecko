import React, { Component } from 'react';
import Link from '../components/link';

import Isvg from 'react-inlinesvg';
import Page from '../containers/page';

import {
    Container,
    Row,
    Col,

} from 'reactstrap';

import chevron from '../assets/svg/order-chevron.svg'
import moment from 'moment';

class AboutUsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promotedProjects: [],
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

    componentDidUpdate(prevProps, prevState) {
    }


    render() {




        return (
            <div className="page">
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"O nama".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="about-us">
                    <Container >
                        <Row>
                            {
                                this.state.data && this.state.data.content && this.state.data.content.map((item, idx) => {
                                    if (item.type == 'image') {
                                        return (
                                            <Col lg={{ size: item.width.desktop }} xs={{ size: item.width.mobile }} className="block-section">
                                                <img src={item.value} />
                                            </Col>
                                        )
                                    } else {
                                        return (
                                            <Col lg={{ size: item.width.desktop }} xs={{ size: item.width.mobile }} className="block-section" dangerouslySetInnerHTML={{ __html: item.value && item.value[this.props.lang] }}>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                    </Container>
                </section>
                <section>
                    <Container className="new-events new-events-margin-top">
                        <Row>
                            <Col lg="12">
                                <div className="title">
                                    <h2>{"Vijesti i događaji srbija".translate(this.props.lang)}</h2>
                                    <p>{"Ovo je mogu mjenjatri".translate(this.props.lang)}</p>
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
            </div>
        );
    }
}

export default Page(AboutUsPage);