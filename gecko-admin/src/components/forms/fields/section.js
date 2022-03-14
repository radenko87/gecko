
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';
import HtmlImage from './htmlImage';
import Text from './text';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import deleteIcon from '../../../assets/svg/delete.svg';

class Section extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }






    render() {
        console.log(this.props.value)
        //console.log(generateAlias("ćčććasd"))
        return (
            <>
                <Col lg="12" >
                    <Container fluid className="form-box">
                        <Row>
                            <Col lg="12">
                                <h3 className="title">Sekcije</h3>
                                <h6 className="subtitle">Dodaj novu sekciju</h6>

                            </Col>
                            <Col lg="2" className="input-wrap">
                                <Text
                                    label={"Desktop"}
                                    placeholder="Unesite širinu sekcije za desktop"
                                    value={this.state.desktop}
                                    onChange={(e) => this.setState({ desktop: e })}
                                ></Text>

                            </Col>
                            <Col lg="2" className="input-wrap">
                                <Text
                                    label={"Mobile"}
                                    placeholder="Unesite širinu sekcije za mobilni"
                                    value={this.state.mobile}
                                    onChange={(e) => this.setState({ mobile: e })}

                                ></Text>

                            </Col>
                            <Col lg="2">
                                <button type="button" onClick={() => {
                                    let value = this.props.value;
                                    if (!value) {
                                        value = [];
                                    }
                                    value.push({
                                        width: {
                                            desktop: this.state.desktop,
                                            mobile: this.state.mobile
                                        },
                                        value: {
                                            type: 'html',
                                        }
                                    });
                                    this.props.onChange(value);
                                    this.forceUpdate();
                                }} className="button add-section-btn">Dodaj sekciju</button>

                            </Col>
                        </Row>
                    </Container>
                </Col>
                {
                    this.props.value && this.props.value.map((item, idx) => {
                        console.log(item);
                        return (
                            <Col lg={item.width.desktop} xs={item.width.mobile} >
                                <Container fluid className="form-box">
                                    <Row>
                                        <Col lg="10">
                                            <h3 className="title">Sadržaj</h3>
                                            <h6 className="subtitle">Unesite tekst ili sliku</h6>

                                        </Col>
                                        <Col lg="2">
                                            <button type="button" className="delete-btn" onClick={() => {
                                                let value = this.props.value;
                                                value.splice(idx, 1);
                                                this.props.onChange(value);
                                                this.forceUpdate();

                                            }}> <Isvg src={deleteIcon} /> </button>
                                        </Col>
                                        <Col lg="2" className="input-wrap">
                                            <Text
                                                label={"Širina na desktopu"}
                                                placeholder="Unesite širinu sekcije za desktop"
                                                value={item.width.desktop}
                                                onChange={(e) => {
                                                    let value = this.props.value;
                                                    if (e.target.value < 1) {
                                                        return;
                                                    }
                                                    value[idx].width.desktop = e.target.value;
                                                    this.props.onChange(value);
                                                    this.forceUpdate();

                                                }}
                                            ></Text>

                                        </Col>
                                        <Col lg="2" className="input-wrap">
                                            <Text
                                                label={"Širina na mobilnom"}
                                                placeholder="Unesite širinu sekcije za mobilni"
                                                value={item.width.mobile}
                                                onChange={(e) => {
                                                    let value = this.props.value;
                                                    if (e.target.value < 1) {
                                                        return;
                                                    }
                                                    value[idx].width.mobile = e.target.value;
                                                    this.props.onChange(value);
                                                    this.forceUpdate();

                                                }}
                                            ></Text>

                                        </Col>

                                        <HtmlImage
                                            placeholder="Unesite tekst"
                                            value={item}
                                            multilang={this.props.multilang}
                                            lang={this.props.lang}

                                            onChange={(val) => {
                                                console.log(val);


                                                let value = this.props.value;
                                                value[idx].value = val.value;
                                                value[idx].type = val.type;
                                                console.log(value);
                                                this.props.onChange(value);



                                                this.forceUpdate();
                                            }}
                                        ></HtmlImage>



                                    </Row>
                                </Container>
                            </Col>

                        )
                    })
                }

            </>


        );
    }
}

export default Section;