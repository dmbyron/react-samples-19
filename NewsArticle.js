import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

class NewsArticle extends Component {
    render() {
        return (
            <Media key={this.props.key} as="li" className='news-article'>
                <img
                    width={180}
                    height={150}
                    className="mr-3"
                    src={this.props.image}
                    alt={this.props.imageAltText}
                />
                <Media.Body>
                    <h5>{this.props.title}</h5>
                    <p>{this.props.content}</p>
                    <a href={this.props.linkToArticle}>Read More</a>
                </Media.Body>
            </Media>
        );
    }
}
export default NewsArticle;