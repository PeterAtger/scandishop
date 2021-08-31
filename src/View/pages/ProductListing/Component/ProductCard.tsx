import React, { Component } from 'react'
import { connect } from 'react-redux'
import { APP_SVG } from '../../../../constants/images'
import { CurrenciesProps, PriceProps, ProductProps } from '../../../../Data/Models/DataModels'
import { RootState } from '../../../../Logic/Store/store'
import './ProductCard_styles.scss'

type Props = {
    product: ProductProps,
    price: PriceProps[],
    selectedCurrency: CurrenciesProps
}

class ProductCard extends Component<Props> {
    state = {
        hovered: false
    }
    render() {
        return (
            <div className="item" onMouseEnter={() => { this.setState({ hovered: true }) }} onMouseLeave={() => { this.setState({ hovered: false }) }} key={this.props.product.id}>
                {this.props.product.inStock ?
                    <div className="item-image-container">
                        <img className="item-image" src={this.props.product.gallery[0]} alt={this.props.product.name} />
                    </div> :
                    <div className='item-image-container'>
                        <div className="out-of-stock">Out of Stock</div>
                        <img className="item-image" src={this.props.product.gallery[0]} alt={this.props.product.name} />
                        <div className="overlay"></div>
                    </div>
                }
                {
                    this.state.hovered && <div className="shop-cart">
                        <APP_SVG.CART_FILLED />
                    </div>
                }
                <div className="item-spacer"></div>
                <div className="item-name">{this.props.product.name}</div>
                <div className="item-price">{`${this.props.selectedCurrency.symbol} ${this.props.price[0].amount}`}</div>
            </div>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        selectedCurrency: state.currency.selectedCurrency,
    }
}

export default connect(MapStateToProps)(ProductCard)