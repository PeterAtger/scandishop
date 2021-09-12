import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CartProductsProps, PriceProps } from '../../../../Data/Models/DataModels'
import { decrementQuantaty, incrementQuantaty } from '../../../../Logic/Store/CartReducer'
import { AppDispatch, RootState } from '../../../../Logic/Store/store'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import './CartItem_styles.scss'

type Props = {
    name: string,
    subTitle: string,
    price: PriceProps,
    attributes: JSX.Element | JSX.Element[],
    images: string[]
    decrementQuantaty: (index: number) => void,
    incrementQuantaty: (index: number) => void,
    index: number,
    products: CartProductsProps[]

}

class CartItem extends Component<Props> {

    state = {
        imageIndex: 0
    }

    changeImage = (to: 'next' | 'previous') => {
        let length = this.props.images.length;
        console.log((this.state.imageIndex + 1) % length)
        if (to === 'next') {
            this.setState({ imageIndex: (this.state.imageIndex + 1) % length })
        }
        else {
            let prev = (this.state.imageIndex - 1) % length
            if (prev < 0) {
                prev = length - 1
            }
            this.setState({ imageIndex: prev })
        }
    }

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
                    <div className="image-container">
                        <AiOutlineArrowLeft className="left-arrow" onClick={() => { this.changeImage('previous') }} />
                        <img className="cart-image" src={this.props.images[this.state.imageIndex]} alt={this.props.subTitle} />
                        <AiOutlineArrowRight className="right-arrow" onClick={() => { this.changeImage('next') }} />
                    </div>
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

