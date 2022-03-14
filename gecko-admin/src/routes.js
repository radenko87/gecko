import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';



import { GoogleMapScript } from './components/googleMapScript';
import LoginPage from './views/loginPage';
import PagesListPage from './views/pagesListPage';
import AddPagePage from './views/addPagePage';
import ContactListPage from './views/contactListPage';
import ContactPreviewPage from './views/contactPreviewPage';
import HomePage from './views/homePage';
import AboutUsPage from './views/aboutUsPage';
import Tables from './views/tables';
import Reservations from './views/reservations';
import InfoPage from './views/informationPage';




class Routes extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Router >
                <div>

                    <Switch className="react-switch">
                        <Route
                            path="/"
                            exact
                            render={(...renderProps) => (
                                <HomePage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/information"
                            exact
                            render={(...renderProps) => (
                                <InfoPage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/aboutus"
                            exact
                            render={(...renderProps) => (
                                <AboutUsPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/tables"
                            exact
                            render={(...renderProps) => (
                                <Tables {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/reservations"
                            exact
                            render={(...renderProps) => (
                                <Reservations {...renderProps} {...this.props} />
                            )}
                        />


                        <Route
                            path="/login"
                            exact
                            render={(...renderProps) => (
                                <LoginPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/collection/:collection"
                            exact
                            render={(...renderProps) => (
                                <PagesListPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/collection/:collection/:id"
                            exact
                            render={(...renderProps) => (
                                <AddPagePage {...renderProps} {...this.props} />
                            )}
                        />

                        <Route
                            path="/contacts"
                            exact
                            render={(...renderProps) => (
                                <ContactListPage {...renderProps} {...this.props} />
                            )}
                        />
                        <Route
                            path="/contacts/:id"
                            exact
                            render={(...renderProps) => (
                                <ContactPreviewPage {...renderProps} {...this.props} />
                            )}
                        />





                    </Switch>
                </div>
            </Router >
        );
    }
}

export default Routes;