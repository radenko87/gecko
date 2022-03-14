import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Isvg from 'react-inlinesvg';
import Page from '../containers/page';

import { Rnd } from 'react-rnd';

import Text from '../components/forms/fields/text';

import {
    Container,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';


const tables = [
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>

                <svg xmlns="http://www.w3.org/2000/svg" width="74" height="32" viewBox="0 0 74 32">
                    <rect id="Rectangle_298" data-name="Rectangle 298" width="74" height="32" rx="6" fill={color} />
                </svg>
                <div className="table-number">{number}</div>

            </div>
        )
    },
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="74" viewBox="0 0 32 74">
                    <rect id="Rectangle_308" data-name="Rectangle 308" width="74" height="32" rx="6" transform="translate(32) rotate(90)" fill={color} />
                </svg>
                <div className="table-number">{number}</div>

            </div>


        )
    },
    (color, number, onPress) => {
        return (
            <div className="table" onClick={onPress}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <rect id="Rectangle_299" data-name="Rectangle 299" width="32" height="32" rx="6" fill={color} />
                </svg>
                <div className="table-number">{number}</div>

            </div>

        )
    },
]


const tableNames = ['Separe', 'Duzni sto', 'Visoki']

class Tables extends Component {
    constructor(props) {
        super(props);
        this.addTable = this.addTable.bind(this);
        this.fetchTables = this.fetchTables.bind(this);
        this.saveTableOrder = this.saveTableOrder.bind(this);

        this.state = {
            _tableNumber: 1,
            _selected: 0,
            _minNumberOfPeople: 1,
            items: [

            ]

        };
    }

    fetchTables() {
        if (!localStorage.token) {
            return;
        }

        fetch('http://localhost:4000/admin/fetch/tables', {
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

    componentDidMount() {
        if (!localStorage.token) {
            return;
        }

        this.fetchTables();

    }

    addTable() {
        if (!localStorage.token) {
            return;
        }

        fetch('http://localhost:4000/admin/updateOne/tables/' + (this.state._selectedTable ? this.state._selectedTable._id : 'new'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                position: this.state._selectedTable ? this.state._selectedTable.position :
                    {
                        top: 0,
                        left: 0
                    },
                minNumberOfPeople: this.state._minNumberOfPeople,
                type: this.state._selected,
                number: this.state._tableNumber
            })
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            this.setState({
                _selectedTable: null,
                _tableNumber: 1,
                _selected: 0,
                _minNumberOfPeople: 1,
                conditions: [],

            })
            this.fetchTables();
        })
    }

    saveTableOrder() {
        if (!localStorage.token) {
            return;
        }


        for (let i = 0; i < this.state.items.length; i++) {
            fetch('http://localhost:4000/admin/updateOne/tables/' + this.state.items[i]._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    position: this.state.items[i].position
                })
            }).then((res) => res.json()).then((result) => {
                console.log(result);
            })
        }

        this.setState({
            _tablesChanged: null
        })

    }


    render() {


        return (
            <div className="page-wrap">
                {
                    !localStorage.token ? <Redirect to='/login' /> : null
                }

                <div className="tables-list">
                    {this.state._selectedTable ?
                        <h3>Sto broj {this.state._selectedTable.number}</h3>

                        :
                        <h3>Dodaj novi sto</h3>
                    }
                    <h6>Tipovi stolova</h6>
                    <ul className="tables-ul">
                        {
                            tables.map((item, idx) => {
                                return (
                                    <li onClick={() => this.setState({ _selected: idx })}>
                                        {item(this.state._selected == idx ? '#860000' : '#606060', '', () => { this.setState({ _selected: idx }) })}
                                        <span>{tableNames[idx]}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className="form">
                        <div className="input-wrap">
                            <Text placeholder="Unseite broj stola" label="Broj stola" value={this.state._tableNumber} onChange={(e) => { console.log(e); this.setState({ _tableNumber: e }) }} />
                        </div>

                        <div className="input-wrap">
                            <Text placeholder="Unseite broj osoba" label="Minimalan broj osoba za stolom" value={this.state._minNumberOfPeople} onChange={(e) => { console.log(e); this.setState({ _minNumberOfPeople: e }) }} />
                        </div>

                        {
                            this.state._selectedTable ?
                                <button className="button" onClick={this.addTable}>IZMJENI STO</button>

                                :
                                <button className="button" onClick={this.addTable}>DODAJ STO</button>
                        }
                    </div>
                </div>



                <div className="tables-wrap">
                    {
                        this.state.items.map((item, idx) => {
                            return (
                                <Rnd
                                    enableResizing={false}
                                    position={{ x: item.position.left, y: item.position.top }}
                                    onClick={() => {
                                        this.setState({
                                            conditions: item.conditions,
                                            _minNumberOfPeople: item.minNumberOfPeople,
                                            _selected: item.type,
                                            _tableNumber: item.number,
                                            _selectedTable: item
                                        })
                                    }}
                                    onDragStop={(e, d) => {
                                        let items = this.state.items;

                                        if (item.position.top == d.y && item.position.left == d.x) {
                                            return;
                                        }

                                        items[idx].position.top = d.y;
                                        items[idx].position.left = d.x;

                                        this.setState({ items, _tablesChanged: true })
                                    }}
                                >
                                    {tables[item.type](this.state._selectedTable && this.state._selectedTable._id == item._id ? '#860000' : '#606060', item.number, () => { })}
                                </Rnd>

                            )
                        })
                    }

                </div>
                {this.state._tablesChanged ?
                    <Container fluid className="bottom-wrap">
                        <Row>
                            <Col lg="12">
                                <button onClick={this.saveTableOrder}>Sačuvaj raspored</button>
                            </Col>
                        </Row>

                    </Container>

                    : null
                }

            </div>
        );
    }
}

export default Page(Tables);