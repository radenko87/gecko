import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,

} from 'react-router-dom';
import {GoogleMapScript} from './components/googleMapScript';

import { routes, generateRoutes } from './routesList';



class Routes extends Component {


    render() {
        return (
            <div>
                                <GoogleMapScript API_KEY="" />

                <Switch className="react-switch">
                    {
                        generateRoutes(routes).map((route) => {
                            return (
                                <Route
                                    path={route.path}
                                    exact
                                    render={(...renderProps) => {
                                        const Component = route.component;
                                        return (
                                            <Component {...renderProps} {...this.props} loadData={route.loadData} generateSeoTags={route.generateSeoTags} />
                                        )
                                    }}
                                />

                            )
                        })
                    }
                </Switch>
            </div>
        );
    }
}

export default Routes;