import React, { Component } from 'react'
import { connect } from 'react-redux'
import { APP_SVG } from '../../../constants/images'
import { CategoryProps, CurrenciesProps } from '../../../Data/Models/DataModels'
import { Capitalize } from '../../../Logic/Helpers/functions'
import { RootState } from '../../../Logic/Store/store'
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
        let items = this.props.loading ? "Loading..." : products?.map(product => {
            let price = product.prices.filter(value => value.currency === this.props.selectedCurrency.code)
            return (
                <div className="item" onMouseEnter={() => { }} onMouseLeave={() => { }} key={product.id}>
                    {product.inStock ?
                        <div className="item-image-container">
                            <img className="item-image" src={product.gallery[0]} alt={product.name} />
                        </div> :
                        <div className='item-image-container'>
                            <div className="out-of-stock">Out of Stock</div>
                            <img className="item-image" src={product.gallery[0]} alt={product.name} />
                            <div className="overlay"></div>
                        </div>
                    }
                    <div className="shop-cart">
                        <APP_SVG.CART_FILLED />
                    </div>
                    <div className="item-spacer"></div>
                    <div className="item-name">{product.name}</div>
                    <div className="item-price">{`${this.props.selectedCurrency.symbol} ${price[0].amount}`}</div>
                </div>

            )
        })
        let categoryName = this.props.loading ? "Category Name" : Capitalize(this.props.allCategories[this.props.selectedCategory].name)
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