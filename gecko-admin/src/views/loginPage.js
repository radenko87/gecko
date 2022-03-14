import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import logo from '../assets/images/logo.png';
import bg from '../assets/images/login-bg.png';
import LoginForm from '../components/forms/loginForm';


import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.state = {

        };
    }

    login(data) {

        fetch('http://localhost:4000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        }).then((res) => res.json()).then((result) => {
            if (!result.error){
                localStorage.setItem('token', result.token);
                this.props[0].history.push('/');
            }else{
                this.setState({
                    error: result.error
                })
            }
        })

    }



    render() {

        return (
            <div className="login-page">
                {
                    localStorage.token ? <Redirect to='/' /> : null
                }

                <Container className="block-wrap">
                    <Row>
                        <Col lg="12">
                            <div className="logo">
                                <img src={logo} />
                                <h2>React<span>Admin</span></h2>
                            </div>
                        </Col>
                        <Col lg="12">
                            <Container>
                                <Row className="login-container">
                                    <Col lg="6" xs="12" className="login-bg">
                                        <img src={bg} />
                                    </Col>
                                    <Col lg="6" xs="12" className="login-form">
                                        <Container>
                                            <Row>
                                                <Col lg="12">
                                                    <h3>Login</h3>
                                                    <h6>Hello there! Sign in and start managing your website</h6>
                                                </Col>
                                            </Row>
                                            <LoginForm onSubmit={this.login}/>

                                        </Container>

                                    </Col>

                                </Row>
                            </Container>
                        </Col>
                    </Row>

                </Container>



            </div >
        );
    }
}

export default LoginPage;