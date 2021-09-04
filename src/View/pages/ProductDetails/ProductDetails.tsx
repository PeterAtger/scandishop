import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { ProductProps } from '../../../Data/Models/DataModels'
import { RootState } from '../../../Logic/Store/store'

interface Props extends RouteComponentProps {
    loading: boolean,
    products: ProductProps[],
    selectedProduct: number
}
class ProductDetails extends Component<Props> {
    render() {
        let currentProduct: ProductProps;
        let images: string[] = [];
        let title: string = "";
        if (!this.props.loading) {
            try {
                currentProduct = this.props.products[this.props.selectedProduct]
                for (let i = 0; i < currentProduct.gallery.length; i++) {
                    images.push(currentProduct.gallery[i])
                }
                title = currentProduct.name;
            } catch (e) {
                this.props.history.replace('/')
            }
        }
        return this.props.loading ? (
            <div>
                LoadingPage
            </div>
        ) :
            <div>
                {title}
            </div>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading.isLoading,
        products: state.products.allProducts,
        selectedProduct: state.products.currentProduct
    }
}

const ProductDetailsWithRouter = withRouter(ProductDetails)

export default connect(mapStateToProps)(ProductDetailsWithRouter)
