import React, { Component } from 'react';
import Link from '../components/link';

import Isvg from 'react-inlinesvg';
import Page from '../containers/page';

import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,

} from 'reactstrap';


import chevron from '../assets/svg/order-chevron.svg'
import rightChevron from '../assets/svg/right-arrow.svg'
import moment from 'moment';
import close_ico from '../assets/svg/close_ico.svg';

var striptags = require('striptags');

class MenuPage extends Component {
    constructor(props) {
        super(props);
        // this.updateStateFromSearch = this.updateStateFromSearch.bind(this);
        // this.updateParam = this.updateParam.bind(this);
        // this.get = this.get.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        this.state = {
            promotedProjects: [],
            page: 0,
            ...props.initialData,
            activeIndex: 0,
            activeCategory: 0
        };
    }

    updateStateFromSearch(callback) {
        // let broken = this.props[0].location.search.split('?').pop().split('&');
        // let params = { page: 0 };
        // for (let i = 0; i < broken.length; i++) {
        //     if (broken[i].indexOf('=') !== -1) {
        //         params[broken[i].split('=')[0]] = broken[i].split('=')[1];
        //     }
        // }

        // this.setState({
        //     category: null,
        //     tag: null,
        //     items: []
        // }, () => {
        //     this.setState(params, callback);

        // })

    }


    updateParam(name, value) {

        // let broken = this.props[0].location.search.split('?').pop().split('&');
        // let params = {};
        // for (let i = 0; i < broken.length; i++) {
        //     if (broken[i].indexOf('=') !== -1) {
        //         params[broken[i].split('=')[0]] = broken[i].split('=')[1];
        //     }
        // }

        // params[name] = value;

        // let paramsArr = [];
        // for (var key in params) {
        //     if (params.hasOwnProperty(key) && params[key]) {

        //         paramsArr.push(key + "=" + params[key]);
        //     }
        // }



        // let search = '?' + paramsArr.join('&');


        // this.props[0].history.push(this.props[0].location.pathname + search);
        ////console.log(search);
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




        // this.updateStateFromSearch(this.get);
    }

    get() {
        // fetch('http://159.223.28.42:4000/blog', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         page: this.state.page,
        //         lang: this.props.lang
        //     })
        // }).then(res => res.json()).then((result) => {
        //     console.log(result);
        //     this.setState({
        //         items: result.items,
        //         total: result.total
        //     })
        // })

    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    render() {
        let arrCategory = [];
        if (this.state.data) {
            for (let i = 0; i < this.state.data.length; i++) {
                arrCategory.push([this.state.data[i]])
            }
        }
        let arr = [];
        if (this.state.items) {
            for (let i = 0; i < this.state.items.length; i++) {
                arr.push([this.state.items[i]])
            }
        }

       
        const { activeIndex } = this.state;
        const { activeCategory } = this.state;
        const slides = this.state.items && this.state.items.map((item) => {
            return (
                <CarouselItem
                    tag="div"
                    key={item}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <div className="lightbox-item padding540">
                        <div className="menu-item-view">
                            <div className="item-img">
                                <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')}/>
                            </div>
                            <div className="item-description">
                                <h4>{Object.translate(item, 'name', this.props.lang)}</h4>
                                <h5>{Object.get(item, 'price')}€</h5>
                            </div>
                            <div className="item-content">
                                <p>{Object.translate(item, 'content', this.props.lang)}</p>
                            </div>
                        </div>
                    </div>

                </CarouselItem>
            );
        });
        return (
            <div className="page">
                <section className="page-title">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h2>{"Pregledajte naš meni".translate(this.props.lang)}</h2>
                                <h6>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</h6>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="menu-page">
                    <Container>
                        <Row>
                            <Col lg="12" className="menu-fields">
                                {
                                    this.state.data && this.state.data.map((item, idx) => {
                                        return (
                                            <div 
                                                className={ this.state.activeCategory == 0 ? "menu-field" : item._id == this.state.data[activeCategory-1]._id ? "menu-field focus" : "menu-field"}
                                                onClick={() => {
                                                    let index = 1;
                                                    for (let i = 0; i < idx; i++) {
                                                        index += arrCategory[i].length;
                                                    }

                                                    this.setState({ activeCategory: index })
                                                }}
                                            >
                                                <div className="menu-image">
                                                    <Isvg src={'http://159.223.28.42:4000' + Object.get(item, 'image')}

                                                    />
                                                </div>
                                                <div className="field-text">
                                                    <h5>{Object.translate(item, 'name', this.props.lang)} <Isvg src={rightChevron} /></h5>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Col>

                        </Row>
                    </Container>
                </section>

                <section className="menu-items">
                    <Container>
                        <Row>
                            {
                                this.state.activeCategory == 0 ?
                                    this.state.items && this.state.items.map((item, idx) => {
                                        return (
                                            <Col lg="3" xs="6">
                                                <div className="menu-item">
                                                    <div className="item-img">
                                                        {/* <img src={meal} /> */}
                                                        <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')}
                                                            onClick={() => {
                                                                let index = 0;
                                                                for (let i = 0; i < idx; i++) {
                                                                    index += arr[i].length;
                                                                }

                                                                this.setState({ lightbox: true, activeIndex: index })
                                                                console.log(activeIndex);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="item-description">
                                                        <h4>{Object.translate(item, 'name', this.props.lang)}</h4>
                                                        <h5>{Object.get(item, 'price')} €</h5>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                    :
                                    this.state.items && this.state.items.map((item, idx) => {
                                        if(item.category == this.state.data[activeCategory-1]._id)
                                        return (
                                            <Col lg="3">
                                                <div className="menu-item">
                                                    <div className="item-img">
                                                        {/* <img src={meal} /> */}
                                                        <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')}
                                                            onClick={() => {
                                                                let index = 0;
                                                                for (let i = 0; i < idx; i++) {
                                                                    index += arr[i].length;
                                                                }

                                                                this.setState({ lightbox: true, activeIndex: index })
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="item-description">
                                                        <h4>{Object.translate(item, 'name', this.props.lang)}</h4>
                                                        <h5>{Object.get(item, 'price')} €</h5>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })

                            }


                        </Row>
                        {/* <Row>
                            <Col lg="6">
                                <div className="menu-item-view">
                                    <div className="item-img">
                                        <img src={meal} />
                                    </div>
                                    <div className="item-description">
                                        <h4>Camarro Doručak</h4>
                                        <h5>5,80 €</h5>
                                    </div>
                                    <div className="item-content">
                                        <p>
                                            Kombinacija slatko-slanog doručka, domaća cicvara sa
                                            grilovanom pančetom i feta sirom u paru sa domaćim
                                            wafflama i domaćim dzemom od Šumskog voća.
                                            <br/><br/>
                                            Kombinacija slatko-slanog doručka, domaća cicvara sa
                                            grilovanom pančetom i feta sirom u paru sa domaćim
                                            wafflama i domaći dzemom od Šumskog voća.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row> */}
                    </Container>
                </section>


                <section className="new-events new-events-margin-top">
                    <Container >
                        <Row>
                            <Col lg="12">
                                <div className="title">
                                    <h2>{"Vijesti i događaji".translate(this.props.lang)}</h2>
                                    <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit".translate(this.props.lang)}</p>
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
                                                        <img src={'http://159.223.28.42:4000' + Object.get(item, 'image')} />
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
                {this.state.lightbox ?
                    <div className="lightbox">
                        <div className="close" onClick={() => this.setState({ lightbox: null })}>
                            <Isvg src={close_ico} />
                        </div>
                        <Carousel
                            activeIndex={activeIndex}
                            next={this.next}
                            previous={this.previous}
                            autoPlay={null}
                        >
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>

                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Page(MenuPage);