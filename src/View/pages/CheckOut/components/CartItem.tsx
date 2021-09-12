import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CartProductsProps, PriceProps } from '../../../../Data/Models/DataModels'
import { decrementQuantaty, incrementQuantaty } from '../../../../Logic/Store/CartReducer'
import { AppDispatch, RootState } from '../../../../Logic/Store/store'
import './CartItem_styles.scss'

type Props = {
    name: string,
    subTitle: string,
    price: PriceProps,
    attributes: JSX.Element | JSX.Element[],
    image: string
    decrementQuantaty: (index: number) => void,
    incrementQuantaty: (index: number) => void,
    index: number,
    products: CartProductsProps[]

}

class CartItem extends Component<Props> {
    render() {
        return (
            <div className="cart-item">
                <div className="left-cart-item">
                    <div className="cart-text">
                        <div className="brand">{this.props.name}</div>
                        <div className="name">{this.props.subTitle}</div>
                    </div>
                    <div className="name">{`${this.props.price?.currency} ${this.props.price?.amount}`}</div>
                    <div className="attributes">
                        {this.props.attributes}
                    </div>
                </div>
                <div className="right-cart-item">
                    <div className="quantaty">
                        <div onClick={() => { this.props.incrementQuantaty(this.props.index) }} className="inc-dec">
                            +
                        </div>
                        <div className="quantaty-number">
                            {this.props.products[this.props.index].quantaty}
                        </div>
                        <div onClick={() => { this.props.decrementQuantaty(this.props.index) }} className="inc-dec">
                            -
                        </div>

                    </div>
                    <img className="cart-image" src={this.props.image} alt={this.props.subTitle} />
                </div>
            </div >
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        att: state.cartReducer[0].selectedAttributes,
        products: state.cartReducer,

    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        incrementQuantaty: (index: number) => {
            dispatch(incrementQuantaty(index))
        },
        decrementQuantaty: (index: number) => {
            dispatch(decrementQuantaty(index))
        },
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(CartItem)

