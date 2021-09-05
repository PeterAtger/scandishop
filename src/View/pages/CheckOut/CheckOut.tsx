import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CartProductsProps, CurrenciesProps, ProductProps } from '../../../Data/Models/DataModels'
import { addProductToCart, decrementQuantaty, incrementQuantaty, setCartAttributes } from '../../../Logic/Store/CartReducer'
import { AppDispatch, RootState } from '../../../Logic/Store/store'

type CheckOutProps = {
    addProductToCart: (product: ProductProps) => void
    incrementQuantaty: () => void
    decrementQuantat: () => void
    setCartAttributes: (attribute: { index: number, attributes: number[] }) => void,
    selectedCurrency: CurrenciesProps,
    products: CartProductsProps[],

}


class CheckOut extends Component<CheckOutProps> {
    render() {
        return (
            <h2>
                Cart
                {this.props.products[0].id}
            </h2>
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
