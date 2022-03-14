import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';
import menu from '../assets/svg/menu.svg';

import list from '../assets/svg/list.svg';
import add from '../assets/svg/add.svg';
import rocket from '../assets/svg/rocket.svg';
import mail from '../assets/svg/mail.svg';
import settings from '../assets/svg/settings.svg';
import exit from '../assets/svg/exit.svg';
import edit from '../assets/svg/edit.svg';

import home from '../assets/svg/home.svg';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _show: true
        };
    }




    render() {

        return (

            <div className={this.state._show ? `sidebar` : 'sidebar sidebar-hidden'}>
                <div className="top">
                    <div className="logo">
                        <Isvg src={logo} />
                    </div>

                </div>
                <div className="items">
                    <h6>POČETNA</h6>
                    <ul>

                        <li>
                            <Link lang={this.props.lang} to='/' className={this.props[0].location.pathname == '/' ? 'active' : null}>
                                <Isvg src={home} />
                                Uredi
                            </Link>
                        </li>

                        <li>
                            <Link lang={this.props.lang} to='/tables' className={this.props[0].location.pathname == '/tables' ? 'active' : null}>
                                <Isvg src={list} />
                                Stolovi
                            </Link>
                        </li>
                        <li>
                            <Link lang={this.props.lang} to='/reservations' className={this.props[0].location.pathname == '/reservations' ? 'active' : null}>
                                <Isvg src={list} />
                                Rezervacije
                            </Link>
                        </li>





                    </ul>
                    <h6>O NAMA</h6>
                    <ul>

                        <li>
                            <Link lang={this.props.lang} to='/aboutus' className={this.props[0].location.pathname == '/aboutus' ? 'active' : null}>
                                <Isvg src={edit} />
                                Uredi
                            </Link>
                        </li>
                    </ul>
                    <h6>INFORMACIJE</h6>
                    <ul>
                        <li>
                            <Link lang={this.props.lang} to='/information' className={this.props[0].location.pathname == '/information' ? 'active' : null}>
                                <Isvg src={edit} />
                                Uredi
                            </Link>
                        </li>
                    </ul>

                   {/* <h6>STRANICE</h6>
                    <ul>
                        <li>
                            <Link lang={this.props.lang} to='/collection/services' className={this.props[0].location.pathname == '/collection/services' ? 'active' : null}>
                                <Isvg src={list} />
                                Sve stranice
                            </Link>
                        </li>
                        <li>
                            <Link lang={this.props.lang} to='/collection/services/new' className={this.props[0].location.pathname == '/collection/services/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Nova stranica
                            </Link>
                        </li>
                   </ul>*/}

                    <h6>NOVOSTI</h6>
                    <ul>

                        <li>
                            <Link lang={this.props.lang} to='/collection/blog' className={this.props[0].location.pathname == '/collection/blog' ? 'active' : null}>
                                <Isvg src={list} />
                                Sve novosti
                            </Link>
                        </li>


                        <li>
                            <Link lang={this.props.lang} to='/collection/blog/new' className={this.props[0].location.pathname == '/collection/blog/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Nova novost
                            </Link>
                        </li>


                    </ul>

                    <h6>KATEGORIJE</h6>
                    <ul>

                        <li>
                            <Link lang={this.props.lang} to='/collection/categories' className={this.props[0].location.pathname == '/collection/categories' ? 'active' : null}>
                                <Isvg src={list} />
                                Sve kategorije
                            </Link>
                        </li>


                        <li>
                            <Link lang={this.props.lang} to='/collection/categories/new' className={this.props[0].location.pathname == '/collection/categories/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Nova kategorija
                            </Link>
                        </li>


                    </ul>
                    <h6>JELA</h6>
                    <ul>

                        <li>
                            <Link lang={this.props.lang} to='/collection/items' className={this.props[0].location.pathname == '/collection/items' ? 'active' : null}>
                                <Isvg src={list} />
                                Sva jela
                            </Link>
                        </li>


                        <li>
                            <Link lang={this.props.lang} to='/collection/items/new' className={this.props[0].location.pathname == '/collection/items/new' ? 'active' : null}>
                                <Isvg src={add} />
                                Novo jelo
                            </Link>
                        </li>


                    </ul>



                    <h6>KONTAKTI</h6>
                    <ul>
                        <li>
                            <Link lang={this.props.lang} to='/contacts' className={this.props[0].location.pathname == '/contacts' ? 'active' : null}>
                                <Isvg src={mail} />
                                Svi kontakti
                            </Link>
                        </li>

                    </ul>


                  {/*  <h6>SEO</h6>
                    <ul>
                        <li>
                            <Link lang={this.props.lang} to='/collection/seo' className={this.props[0].location.pathname == '/collection/seo' ? 'active' : null}>
                                <Isvg src={list} />
                                Svi linkovi
                            </Link>
                        </li>
                        <li>
                            <Link lang={this.props.lang} to='/collection/seo/new' className={this.props[0].location.pathname == '/collection/seo/new' ? 'active' : null}>
                                <Isvg src={rocket} />
                                Novi link
                            </Link>
                        </li>


                    </ul>
                  */}

                    <ul className="logout">
                        <li onClick={() => localStorage.removeItem('token')}>
                            <Link lang={this.props.lang} to='/login' >
                                <Isvg src={exit} />
                                Odjavi se
                            </Link>
                        </li>
                    </ul>

                </div>

                <div className="menu" onClick={() => this.setState({ _show: !this.state._show })}>
                    <Isvg src={menu} />
                </div>

            </div >
        )
    }

};

export default Sidebar;