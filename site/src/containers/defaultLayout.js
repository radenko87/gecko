import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';


export const DefaultLayout = (Wrapped) => (props) => {
    return (
        <div>
            <Header {...props} />
            <Wrapped {...props} />
            <Footer {...props} />
            {/*!props.cookies && props.lang == 'en' ? <div className="cookies">
                <p>We use cookies to personalize and optimize user experience. For more information, visit our <Link lang={this.props.lang} to='/privacy-policy' >Privacy Policy</Link>.</p>
                <button onClick={() => { props.allowCookies() }}>I AGREE</button>
            </div> :
                null
    */}

        </div>
    );
};

export default DefaultLayout;