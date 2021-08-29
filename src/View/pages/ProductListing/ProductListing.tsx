import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryProps } from '../../../Data/Models/DataModels'
import { RootState } from '../../../Logic/Store/store'
import './ProductListing_styles.scss'

type Props = {
    allCategories: CategoryProps[],
    selectedCategory: number
}

class ProductListing extends Component<Props> {
    render() {
        let Products = this.props.allCategories[this.props.selectedCategory]
        console.log(Products)
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

const MapStateToProps = (state: RootState) => {
    return {
        allCategories: state.categories.allCategories,
        selectedCategory: state.categories.selectedCategory
    }
}
export default connect(MapStateToProps)(ProductListing)