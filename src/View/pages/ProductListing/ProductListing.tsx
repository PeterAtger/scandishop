import React, { Component } from 'react'
import './ProductListing_styles.scss'

export default class ProductListing extends Component {
    render() {
        return (
            <div className="women-page">
                <p className="title">Category name</p>
                <div className="items">
                    <div className="item">1</div>
                    <div className="item">2</div>
                    <div className="item">3</div>
                    <div className="item">4</div>
                    <div className="item">5</div>
                </div>
            </div>
        )
    }
}

