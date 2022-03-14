import React, { Component } from 'react';
import { Link, matchPath } from 'react-router-dom';
import translateLinkToLang from '../translateLinkToLang';

class LangLink extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let to = translateLinkToLang(this.props.to, this.props.lang);

       
        return (
            <Link {...this.props} to={to}>{this.props.children}</Link>
        );
    }
}

export default LangLink;