import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductProps } from '../../../Data/Models/DataModels'
import { RootState } from '../../../Logic/Store/store'

type Props = {
    loading: boolean,
    products: ProductProps[],
    selectedProduct: number
}
class ProductDetails extends Component<Props> {
    render() {
        return (
            <div>
                <p>
                    {this.props.loading ? "Loading..." : this.props.selectedProduct}
                    {/* {this.props.product} */}
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading.isLoading,
        products: state.products.allProducts,
        selectedProduct: state.products.currentProduct
    }
}

export default connect(mapStateToProps)(ProductDetails)
