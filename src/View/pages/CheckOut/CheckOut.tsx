import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CartProductsProps, CurrenciesProps, ProductProps } from '../../../Data/Models/DataModels'
import { addProductToCart, decrementQuantaty, incrementQuantaty, setCartAttributes } from '../../../Logic/Store/CartReducer'
import { AppDispatch, RootState } from '../../../Logic/Store/store'
import CartItem from './components/CartItem'
import './Checkout_styles.scss'
import CartItemLogic from '../../../Logic/CartItem/CartItem.logic'

type CheckOutProps = {
    addProductToCart: (product: ProductProps) => void
    incrementQuantaty: () => void
    decrementQuantat: () => void
    setCartAttributes: (attribute: { index: number, attributes: number[] }) => void,
    selectedCurrency: CurrenciesProps,
    products: CartProductsProps[],

}


class CheckOut extends Component<CheckOutProps> {
    cartLogic: CartItemLogic

    constructor(props: CheckOutProps) {
        super(props);
        this.cartLogic = new CartItemLogic()
    }

    loadItems = () => {
        let items = [];
        for (let i = 0; i < this.props.products.length; i++) {
            let attributes = this.cartLogic.loadAttributes(this.props.products[i].product, i)
            items.push(
                <div key={String(i)} style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
                    <div style={{ backgroundColor: 'gray', width: '100%', height: "1px" }} />
                    <CartItem name={this.props.products[i].product.brand!}
                        subTitle={this.props.products[i].product.name}
                        price={this.props.products[i].product.prices.filter((p => p.currency === this.props.selectedCurrency.code))[0]}
                        attributes={attributes}
                        image={this.props.products[i].product.gallery[0]}
                        index={i}
                    />
                    <div style={{ backgroundColor: 'gray', width: '100%', height: "1px" }} />
                </div>
            )
        }
        return items
    }

    render() {
        let items = this.loadItems()
        return (
            <div className="checkout-page">
                <h2 className="title">
                    Cart
                </h2>
                {items}
            </div>
        )
    }
}


const MapStateToProps = (state: RootState) => {
    return {
        selectedCurrency: state.currency.selectedCurrency,
        products: state.cartReducer,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addProductToCart: (product: ProductProps) => {
            dispatch(addProductToCart(product))
        },
        incrementQuantaty: () => {
            dispatch(incrementQuantaty)
        },
        decrementQuantat: () => {
            dispatch(decrementQuantaty)
        },
        setCartAttributes: (attribute: { index: number, attributes: number[] }) => {
            dispatch(setCartAttributes(attribute))
        }
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(CheckOut)
