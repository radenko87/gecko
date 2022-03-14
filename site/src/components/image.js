import React, { Component } from 'react';

import no_image from '../assets/images/no-image.jpg';

class Image extends Component {
    constructor(props) {
        super(props);
        this.image = {
            offsetWidth: 400
        }

        this.state = {
        };
    }




    render() {

        let src;
        let extension = this.props.src ?  '.' + this.props.src.split('.').pop() : null;
        let defaultImage = false;
        if (!this.image) {
            src = null;
        }


        if (this.image && typeof window !== 'undefined' && window.innerWidth < 600) {
            let width = this.image.offsetWidth;

            if (width < 100) {
                
                src = this.props.src.replace(extension, '-100x' + extension);
            } else {
                for (let i = width; i <= 600; i++) {
                    if (i % 100 === 0) {
                        console.log(i);
                        src = this.props.src.replace(extension, `-${i*2}x` + extension);
                        break;
                    }
                }
            }


        } else if (typeof window !== 'undefined' && window.innerWidth >= 600){
            src = this.props.src;
        }


        if (typeof localStorage !== 'undefined' && localStorage._webpSupport && src) {
            src = src.replace(extension, '.webp');
        }

        if (!src && typeof window !== 'undefined'){
            src = no_image;
        }else if (typeof window === 'undefined'){
            src = this.props.src.replace(extension, '-200x.webp');
        }

        
        return (
            <img style={!this.props.src ? { minWidth: '100%' } : null} ref={(node) => this.image = node} {...this.props} src={src} />
        );
    }
}

export default Image;