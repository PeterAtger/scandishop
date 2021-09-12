import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { APP_SVG } from '../../../../../constants/images'
import { CartProductsProps, CurrenciesProps } from '../../../../../Data/Models/DataModels'
import CartItemLogic from '../../../../../Logic/CartItem/CartItem.logic'
import { RootState } from '../../../../../Logic/Store/store'
import CartItem from '../../../../pages/CheckOut/components/CartItem'

interface Props extends RouteComponentProps {
    products: CartProductsProps[],
    selectedCurrency: CurrenciesProps,
}

type State = {
    dropDownClicked: boolean
}

class CartDropDown extends Component<Props, State> {
    cartLogic: CartItemLogic
    wrapperRef: React.RefObject<any>

    state: Readonly<State> = {
        dropDownClicked: false
    }

    constructor(props: Props) {
        super(props);
        this.cartLogic = new CartItemLogic()

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event: { target: any }) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ dropDownClicked: false })
        }
    }


    clickHandler = (cartCount: number) => {
        if (this.getWindowDimensions().width > 720 && cartCount !== 0)
            this.setState({ dropDownClicked: !this.state.dropDownClicked })
        else {
            this.props.history.replace('/Cart')
        }
    }

    getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    loadItems = () => {
        let cartCount = 0;
        let items = [];
        let totalPrice: number | string = 0;
        for (let i = 0; i < this.props.products.length; i++) {
            let price = this.props.products[i].product.prices.filter((p => p.currency === this.props.selectedCurrency.code))[0]
            cartCount = cartCount + (this.props.products[i].quantaty)
            totalPrice = totalPrice + (price?.amount * this.props.products[i].quantaty)
            let attributes = this.cartLogic.loadAttributes(this.props.products[i].product, i)
            items.push(
                <div key={String(i)} className="cart-item-container">
                    <div className="seperator" />
                    <CartItem name={this.props.products[i].product.brand!}
                        subTitle={this.props.products[i].product.name}
                        price={price}
                        attributes={attributes}
                        image={this.props.products[i].product.gallery[0]}
                        index={i}
                    />
                    <div className="seperator" />
                </div>
            )
        }
        totalPrice = parseFloat(totalPrice.toString()).toFixed(2)
        return { items, totalPrice, cartCount }
    }

    render() {
        let { items, totalPrice, cartCount } = this.loadItems();
        return (
            <div ref={this.wrapperRef} className="dropdown-container">
                <div onClick={() => { this.clickHandler(cartCount) }} className="currency-dropdown-selector">
                    <APP_SVG.CART />
                    {items.length !== 0 && <div className="item-counter">{cartCount}</div>}
                </div>
                {this.state.dropDownClicked &&
                    <div className="dropdown-menu">
                        {items}
                        <div className="price-text">
                            <div>
                                {`Total `}
                            </div>
                            {`${this.props.selectedCurrency.symbol} ${totalPrice}`}
                        </div>
                        <div className="price-text">
                            <button onClick={() => { this.props.history.replace('/Cart'); this.clickHandler(cartCount) }} className="view-cart">
                                View Cart
                            </button>
                            <button onClick={() => { this.props.history.replace('/Cart'); this.clickHandler(cartCount) }} className="add-to-cart">
                                Checkout
                            </button>
                        </div>
                    </div>
                }
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

const CartDropDownWithRouter = withRouter(CartDropDown)

export default connect(MapStateToProps)(CartDropDownWithRouter)
