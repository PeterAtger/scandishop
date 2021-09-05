import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { CurrenciesProps, PriceProps, ProductProps } from '../../../Data/Models/DataModels'
import { RootState } from '../../../Logic/Store/store'
import './ProductDetails_styles.scss'
import parse from 'html-react-parser';

interface Props extends RouteComponentProps {
    loading: boolean,
    products: ProductProps[],
    selectedProduct: number
    selectedCurrency: CurrenciesProps,
}

type State = {
    selectedImageIndex: number,
    selectedAttributeIndex: number[],
}

class ProductDetails extends Component<Props, State> {

    state: Readonly<State> = {
        selectedImageIndex: 0,
        selectedAttributeIndex: new Array(10).fill(0),
    }

    loadAttributes = (currentProduct: ProductProps) => {
        let categories: JSX.Element[] = [];

        // Load attributes
        if (currentProduct.attributes) {
            for (let i = 0; i < currentProduct.attributes.length; i++) {
                if (currentProduct.attributes[i].type === "text") {
                    let itemsList = []
                    for (let j = 0; j < currentProduct.attributes[i].items.length; j++) {
                        itemsList.push(
                            <div key={String(j)}
                                onClick={() => { let state = this.state.selectedAttributeIndex; state[i] = j; this.setState({ selectedAttributeIndex: state }) }}
                                className="selectable"
                                style={j === this.state.selectedAttributeIndex[i] ? { backgroundColor: 'black', color: 'white' } :
                                    { backgroundColor: 'white', opacity: 0.2 }}>
                                {currentProduct.attributes[i].items[j].value}
                            </div>
                        )
                    }
                    categories.push(
                        <div key={String(i)}>
                            {currentProduct.attributes[i].name}
                            <div className="category">
                                {itemsList}
                            </div>
                        </div>
                    )
                } else if (currentProduct.attributes[i].type === "swatch") {
                    let itemsList = []
                    for (let j = 0; j < currentProduct.attributes[i].items.length; j++) {
                        itemsList.push(
                            <div key={String(j)} style={j === this.state.selectedAttributeIndex[i] ? {} :
                                { backgroundColor: 'white', opacity: 0.2 }}>
                                <div
                                    onClick={() => { let state = this.state.selectedAttributeIndex; state[i] = j; this.setState({ selectedAttributeIndex: state }) }}
                                    style={{ backgroundColor: currentProduct.attributes[i].items[j].value, height: 45, width: 63 }}
                                    className="selectable">
                                </div>
                            </div>
                        )
                    }
                    categories.push(
                        <div key={String(i)}>
                            {currentProduct.attributes[i].name}
                            <div key={String(i)} className="category">
                                {itemsList}
                            </div>
                        </div>
                    )
                }

            }
        }
        return categories;
    }

    loadData = () => {
        let images: JSX.Element[] = [];
        let title: string = "";
        let subTitle: string = "";
        let price: PriceProps = { amount: 0, currency: '' };
        let categories: JSX.Element[] = [];
        let description: string | JSX.Element | JSX.Element[] = "";
        if (!this.props.loading) {
            let currentProduct = this.props.products[this.props.selectedProduct]
            for (let i = 0; i < currentProduct.gallery.length; i++) {
                images.push(
                    <img onClick={() => { this.setState({ selectedImageIndex: i }) }}
                        key={String(i)} className="image" src={currentProduct.gallery[i]}
                        alt={`${currentProduct.id} ${i}`} />)
            }
            title = currentProduct.brand ? currentProduct.brand : ""
            subTitle = currentProduct.name
            price = currentProduct.prices.filter(value => value.currency === this.props.selectedCurrency.code)[0]
            categories = this.loadAttributes(currentProduct)
            description = parse(currentProduct.description!)
        }
        return ({ title, subTitle, price, images, categories, description })
    }

    render() {
        let { title, subTitle, price, images, categories, description } = this.loadData()
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
                        {images[this.state.selectedImageIndex]}
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
                        <div className="sub-Title">
                            Price:
                        </div>
                        {`${this.props.selectedCurrency.symbol} ${price.amount}`}
                    </div>
                    <button className="add-to-cart">Add to cart</button>
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
        selectedCurrency: state.currency.selectedCurrency
    }
}

const ProductDetailsWithRouter = withRouter(ProductDetails)

export default connect(mapStateToProps)(ProductDetailsWithRouter)
