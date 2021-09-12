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

type State = {
    isForward: boolean

}

type Props = {
    loading: boolean,
    allCurrencies: CurrenciesProps[],
    selectedCurrency: CurrenciesProps,
    categories: CategoryProps[],
    selectCategory: any
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
                <div key={e.name} onClick={() => { this.props.selectCategory(index) }} className="Nav-link-container">
                    <Link
                        className="link"
                        replace
                        to={'/'}>
                        <div className="Nav-link">{Capitalize(e.name)} </div>
                    </Link>
                </div>
            )
        })
    }


    render() {
        let currencyPlaceHolder = this.props.loading ? "Loading..." : `${this.props.selectedCurrency.symbol}`;
        let currencyOptions = this.props.loading ? [{ code: '', symbol: '' }] : this.props.allCurrencies;
        let Categories = this.props.loading ? <div>Categories</div> : this.mapCategories()


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
        selectedCurrency: state.currency.selectedCurrency,
        categories: state.categories.allCategories,
        loading: state.loading.isLoading
    }
}

const MapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        selectCategory: (index: number) => {
            dispatch(selectCategory(index))
        }
    }
}



export default connect(MapStateToProps, MapDispatchToProps)(NavBar)
