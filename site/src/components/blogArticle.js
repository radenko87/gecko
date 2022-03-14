import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';


export class BlogArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        let shortDescription = Object.translate(this.props, 'shortDescription', this.props.lang)
        return (
            <Link lang={this.props.lang} to={`/novosti/${Object.translate(this.props, 'alias', this.props.lang) }`}>
                <article>
                    <img src={this.props.image} />
                    <div className="datetime">
                        <p>{moment.unix(this.props.timestamp).format('DD')}</p>
                        <p>{moment.unix(this.props.timestamp).format('MMM')}</p>

                    </div>
                    <h6> {Object.translate(this.props, 'title', this.props.lang)} </h6>
                   <p>{shortDescription && shortDescription.length > 106 ? shortDescription.substring(0, 106) + '...' : shortDescription}</p>
                    
                   <Link lang={this.props.lang} to={`/novosti/${Object.translate(this.props, 'alias', this.props.lang) }`}>{this.props.translate('DETALJNIJE')}</Link>
                </article>
            </Link>
        )
    }
}

export default BlogArticle;