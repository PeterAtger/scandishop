import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductProps } from '../../../Data/Models/DataModels'
import { RootState } from '../../../Logic/Store/store'

type Props = {
    loading: boolean,
    product: ProductProps,
}
class ProductDetails extends Component<Props> {
    render() {
        return (
            <div>
                <p>
                    {this.props.product}
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading.isLoading,
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductDetails)
