import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { CurrenciesProps, ProductProps } from '../../../Data/Models/DataModels'
import ProductDetailsLogic from '../../../Logic/ProductDetails/Details.logic'
import { addProductToCart } from '../../../Logic/Store/CartReducer'
import { AppDispatch, RootState } from '../../../Logic/Store/store'
import './ProductDetails_styles.scss'

interface Props extends RouteComponentProps {
    loading: boolean,
    products: ProductProps[],
    selectedProduct: number
    selectedCurrency: CurrenciesProps,
    selectedImageIndex: number,
    addProductToCart: (product: any) => void,
    selectedAttributes: number[]

}



class ProductDetails extends Component<Props> {
    productLogic: ProductDetailsLogic

    constructor(props: Props) {
        super(props);
        this.productLogic = new ProductDetailsLogic()

    }

    render() {
        let { title, subTitle, price, images, categories, description, inStock } = this.productLogic.loadData()
        return this.props.loading ? (
            <div>
                LoadingPage
            </div>
        ) :
            <div className="details-Page">
                <div className="left">
                    <div className="gallery">
                        {images}
                    </div>
                    <div className="selected-Image">
                        {images[this.props.selectedImageIndex]}
                    </div>
                </div>
                <div className="right">
                    <div className="headline">
                        <div className="title">
                            {title}
                        </div>
                        <div className="sub-Title">
                            {subTitle}
                        </div>
                    </div>
                    <div className="sub-Title">
                        {categories}
                    </div>
                    <div className="title">
                        <div className="title">
                            Price:
                        </div>
                        {`${this.props.selectedCurrency.symbol} ${price.amount}`}
                    </div>
                    {inStock && <button onClick={() => { this.props.addProductToCart({ product: this.props.products[this.props.selectedProduct], attributes: this.props.selectedAttributes }) }} className="add-to-cart">Add to cart</button>}
                    {description}
                </div>
            </div>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading.isLoading,
        products: state.products.allProducts,
        selectedProduct: state.products.currentProduct,
        selectedCurrency: state.currency.selectedCurrency,
        selectedImageIndex: state.products.selectedImage,
        selectedAttributes: state.products.selectedAttributes
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addProductToCart: (product: any) => {
            dispatch(addProductToCart(product))
        },
    }
}

const ProductDetailsWithRouter = withRouter(ProductDetails)

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsWithRouter)
