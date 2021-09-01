import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryProps, CurrenciesProps } from '../../../Data/Models/DataModels'
import { Capitalize } from '../../../Logic/Helpers/functions'
import { RootState } from '../../../Logic/Store/store'
import ProductCard from './Components/ProductCard'
import './ProductListing_styles.scss'

type Props = {
    allCategories: CategoryProps[],
    selectedCategory: number,
    loading: boolean,
    selectedCurrency: CurrenciesProps
}

class ProductListing extends Component<Props> {
    render() {
        let products = this.props.loading ? [] : this.props.allCategories[this.props.selectedCategory].products;
        let categoryName = this.props.loading ? "Category Name" : Capitalize(this.props.allCategories[this.props.selectedCategory].name)
        let items = this.props.loading ? "Loading..." :
            products?.map(product => {
                let price = product.prices.filter(value => value.currency === this.props.selectedCurrency.code)
                return (<ProductCard key={product.id} product={product} price={price} />)
            })
        return (
            <div className="women-page">
                <p className="title">{categoryName}</p>
                <div className="items">
                    {items}
                </div>
            </div>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        allCategories: state.categories.allCategories,
        selectedCategory: state.categories.selectedCategory,
        selectedCurrency: state.currency.selectedCurrency,
        loading: state.loading.isLoading
    }
}
export default connect(MapStateToProps)(ProductListing)