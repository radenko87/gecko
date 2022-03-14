import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Modal from '../components/modal/modal';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import DeletePrompt from '../components/deletePrompt';
import Prompt from '../components/prompt';

export const DefaultLayout = (Wrapped) => (props) => {
    return (
        <div className="wrapper">
            {
                props.loader ?
                    <div className="loader">
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                    : null
            }
            
            <Header {...props} />

            <Sidebar {...props} />
            
            <div className={props.subMenu ? 'sub-menu-active' : props.sidebar ? 'sidebar-active' : ''}>
                <Wrapped {...props} />
            </div>
            {
                props.deletePrompt ?
                    <DeletePrompt
                        {...props}
                    />
                    : null
            }
            {
                props.prompt ?

                    <Prompt
                        {...props}
                    />
                    : null
            }


        </div>
    );
};

export default DefaultLayout;