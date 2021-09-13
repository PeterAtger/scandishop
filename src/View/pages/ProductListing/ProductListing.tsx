import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryProps, CurrenciesProps } from '../../../Data/Models/DataModels'
import { Capitalize } from '../../../Logic/Helpers/functions'
import { setLoading } from '../../../Logic/Store/LoadingReducer'
import { AppDispatch, RootState } from '../../../Logic/Store/store'
import ProductCard from './Components/ProductCard'
import './ProductListing_styles.scss'

type Props = {
    allCategories: CategoryProps[],
    selectedCategory: number,
    loading: boolean,
    selectedCurrency: CurrenciesProps,
    setLoading: (state: boolean) => void,

}

class ProductListing extends Component<Props> {


    mapDate = () => {
        if (!this.props.loading) {
            let products = this.props.allCategories[this.props.selectedCategory].products
            if (products?.length !== 0) {
                let items = products?.map(product => {
                    let price = product.prices.filter(value => value.currency === this.props.selectedCurrency.code)
                    return (<ProductCard key={product.id} product={product} price={price} />)
                })
                return items
            }
        }
    }

    render() {
        let categoryName = this.props.loading ? "Category Name" : Capitalize(this.props.allCategories[this.props.selectedCategory].name)
        let items = this.mapDate()
        return (
            <div className="women-page">
                <p className="title">{categoryName}</p>
                <div className="items">
                    {items}
                </div>
            </div>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        allCategories: state.categories.allCategories,
        selectedCategory: state.categories.selectedCategory,
        selectedCurrency: state.currency.selectedCurrency,
        loading: state.loading.isLoading
    }
}

const MapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setLoading: (state: boolean) => {
            dispatch(setLoading(state))
        }
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(ProductListing)