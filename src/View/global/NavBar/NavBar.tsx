import React, { Component } from 'react'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { APP_SVG } from '../../../constants/images';
import animationData from '../../assets/animations/burger.json';
import './NavBar_styles.scss'
import { connect } from 'react-redux';
import { CategoryProps, CurrenciesProps } from '../../../Data/Models/DataModels';
import AppCurrencyDropdown from './components/dropdown';
import { RootState } from '../../../Logic/Store/store';
import { Capitalize } from '../../../Logic/Helpers/functions';

type State = {
    isForward: boolean

}

type Props = {
    loading: boolean,
    allCurrencies: CurrenciesProps[],
    selectedCurrency: CurrenciesProps,
    categories: CategoryProps[]
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


    render() {
        let placeHolder = this.props.loading ? "Loading..." : `${this.props.selectedCurrency.symbol}`;
        let options = this.props.loading ? [{ code: '', symbol: '' }] : this.props.allCurrencies;
        let Categories = this.props.loading ? <div>Loading...</div> :
            this.props.categories.map(e => {
                return (
                    <div key={e.name} className="Nav-link-container">
                        <div className="Nav-link">{Capitalize(e.name)} </div>
                    </div>
                )
            })

        return (
            <nav className="App-header">
                <div className="burger-container">
                    <div className="burger"> <Lottie speed={this.state.isForward ? 1 : -1} options={this.defaultOptions} /></div>
                </div>
                <div className="Nav-links">
                    {Categories}
                </div>
                <Link to='/Home'>
                    <APP_SVG.LOGO className="logo" onClick={() => { this.setState({ isForward: !this.state.isForward }); }} />
                </Link>
                <div className="Currency-cart">
                    <AppCurrencyDropdown placeHolder={placeHolder} options={options} />
                    <Link to="/Cart" ><APP_SVG.CART /></Link>
                </div>
            </nav>
        )
    }
}

const MapStateToProps = (state: RootState) => {
    return {
        allCurrencies: state.currency.allCurrencies,
        selectedCurrency: state.currency.selectedCurrency,
        categories: state.categories
    }
}



export default connect(MapStateToProps)(NavBar)
