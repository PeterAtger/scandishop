import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { APP_SVG } from '../../../../constants/images'
import { CurrenciesProps, PriceProps, ProductProps } from '../../../../Data/Models/DataModels'
import fetchProduct from '../../../../Data/Repositories/Product'
import { addProductToCart } from '../../../../Logic/Store/CartReducer'
import { setLoading } from '../../../../Logic/Store/LoadingReducer'
import { selectProduct } from '../../../../Logic/Store/ProductReducers'
import { AppDispatch, RootState } from '../../../../Logic/Store/store'
import './ProductCard_styles.scss'

interface Props extends RouteComponentProps {
    product: ProductProps,
    price: PriceProps[],
    selectedCurrency: CurrenciesProps,
    products: ProductProps[],
    setLoading: (state: boolean) => void,
    selectProduct: (index: number) => void,
    addProductToCart: (product: any) => void,
}

class ProductCard extends Component<Props> {
    state = {
        hovered: false
    }

    handleClick = async () => {
        let found = false;
        this.props.setLoading(true);
        this.props.history.replace('/ProductDetails')
        if (this.props.products.length) {
            for (let i = 0; i < this.props.products.length && !found; i++) {
                if (this.props.products[i].id === this.props.product.id) {
                    console.log("From Memory:", this.props.products[i])
                    found = true
                    this.props.selectProduct(i)
                    this.props.setLoading(false);
                }
            }
            if (!found) {
                await fetchProduct(this.props.product.id)
                console.log("From Backend:", this.props.products)
                this.props.selectProduct(this.props.products.length)
                this.props.setLoading(false);

            }
        } else {
            await fetchProduct(this.props.product.id)
            console.log("From Backend:", this.props.products)
            this.props.selectProduct(this.props.products.length)
            this.props.setLoading(false);
        }
    }

    handleCartClick = () => {
        this.props.addProductToCart(
            { product: this.props.product }
        )

    }

    render() {
        return (
            <div className="item"
                onMouseEnter={() => { this.setState({ hovered: true }) }}
                onMouseLeave={() => { this.setState({ hovered: false }) }} key={this.props.product.id}>
                {this.props.product.inStock ?
                    <div onClick={() => { this.handleClick(); }} className="item-image-container">
                        <img className="item-image" src={this.props.product.gallery[0]} alt={this.props.product.name} />
                    </div> :
                    <div className='item-image-container'>
                        <div className="out-of-stock">Out of Stock</div>
                        <img className="item-image" src={this.props.product.gallery[0]} alt={this.props.product.name} />
                        <div className="overlay"></div>
                    </div>
                }
                {
                    this.state.hovered && this.props.product.inStock
                    && <div onClick={this.handleCartClick} className="shop-cart">
                        <APP_SVG.CART_FILLED />
                    </div>
                }
                <div className="item-spacer"></div>
                <div className="item-name">{`${this.props.product.brand} ${this.props.product.name}`}</div>
                <div className="item-price">{`${this.props.selectedCurrency.symbol} ${this.props.price[0].amount}`}</div>
            </div>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        selectedCurrency: state.currency.selectedCurrency,
        products: state.products.allProducts,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setLoading: (state: boolean) => {
            dispatch(setLoading(state))
        },
        selectProduct: (index: number) => {
            dispatch(selectProduct(index))
        },
        addProductToCart: (product: any) => {
            dispatch(addProductToCart(product))
        }
    }
}

const ProductCardWithRouter = withRouter(ProductCard)
export default connect(MapStateToProps, mapDispatchToProps)(ProductCardWithRouter)
