import React, { Component } from 'react'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { APP_SVG } from '../../../constants/images';
import animationData from '../../assets/animations/burger.json';
import './NavBar_styles.scss'
import { connect } from 'react-redux';
import { CategoryProps, CurrenciesProps } from '../../../Data/Models/DataModels';
import AppCurrencyDropdown from './components/dropdown';
import { AppDispatch, RootState } from '../../../Logic/Store/store';
import { Capitalize } from '../../../Logic/Helpers/functions';
import { selectCategory } from '../../../Logic/Store/CategoriesReducer';
import CartDropDown from './components/CartDropDown/CartDropDown';
import { setLoading } from '../../../Logic/Store/LoadingReducer';
import fetchCategories, { fetchAllCategories } from '../../../Data/Repositories/Categories';

type State = {
    isForward: boolean

}

type Props = {
    loading: boolean,
    allCurrencies: CurrenciesProps[],
    selectedCurrency: CurrenciesProps,
    allCategories: CategoryProps[],
    setLoading: (state: boolean) => void,
    categories: CategoryProps[],
    selectCategory: any,
    selectedCategory: number
}

export class NavBar extends Component<Props, State> {

    state: Readonly<State> = {
        isForward: false
    }

    defaultOptions = {
        animationData: animationData,
        loop: false,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    mapCategories = () => {
        return this.props.categories.map((e, index) => {
            return (
                <div key={e.name}
                    onClick={() => { this.props.selectCategory(index); this.loadItems(index) }}
                    className={this.props.selectedCategory === index ? "Nav-link-container--primary" : "Nav-link-container--dark"}>
                    <Link
                        className="link"
                        replace
                        to={'/'}>
                        <div className={this.props.selectedCategory === index ? "Nav-link--primary" : "Nav-link--dark"}
                        >
                            {Capitalize(e.name)} </div>
                    </Link>
                </div>
            )
        })
    }

    loadItems = async (index: number) => {
        if (!this.props.loading) {
            let products = this.props.allCategories[index].products;
            if (index !== 0 && products?.length === 0) {
                this.props.setLoading(true)
                await fetchCategories(this.props.allCategories[index].name)
                this.props.setLoading(false)
            } else if (index === 0 && this.props.allCategories[0].products?.length === 0) {
                this.props.setLoading(true);
                await fetchAllCategories()
                this.props.setLoading(false)
            }
        }
    }


    render() {
        let currencyPlaceHolder = this.props.loading ? "Loading..." : `${this.props.selectedCurrency.symbol}`;
        let currencyOptions = this.props.loading ? [{ code: '', symbol: '' }] : this.props.allCurrencies;
        let Categories = this.props.loading ? <div className="Nav-link-container">Loading...</div> : this.mapCategories()


        return (
            <nav className="App-header">
                <div className="burger-container">
                    <div className="burger" onClick={() => { this.setState({ isForward: !this.state.isForward }); }}>
                        <Lottie speed={this.state.isForward ? 1 : -1} options={this.defaultOptions} />
                        {this.state.isForward &&
                            <div >
                                {Categories}
                            </div>
                        }
                    </div>
                </div>
                <div className="Nav-links">
                    {Categories}
                </div>
                <Link
                    replace
                    to='/'>
                    <APP_SVG.LOGO className="logo" />
                </Link>
                <div className="Currency-cart">
                    <AppCurrencyDropdown placeHolder={currencyPlaceHolder} options={currencyOptions} />
                    <CartDropDown />
                </div>
            </nav>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        allCurrencies: state.currency.allCurrencies,
        allCategories: state.categories.allCategories,
        selectedCurrency: state.currency.selectedCurrency,
        categories: state.categories.allCategories,
        loading: state.loading.isLoading,
        selectedCategory: state.categories.selectedCategory
    }
}

const MapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        selectCategory: (index: number) => {
            dispatch(selectCategory(index))
        },
        setLoading: (state: boolean) => {
            dispatch(setLoading(state))
        }
    }
}



export default connect(MapStateToProps, MapDispatchToProps)(NavBar)
