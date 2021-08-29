import React, { Component } from 'react'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { APP_SVG } from '../../../constants/images';
import animationData from '../../assets/animations/burger.json';
import './NavBar_styles.scss'
import { connect } from 'react-redux';
import { CurrenciesProps } from '../../../Data/Models/DataModels';
import AppCurrencyDropdown from './components/dropdown';
import { RootState } from '../../../Logic/Store/store';

type State = {
    isForward: boolean

}

type Props = {
    loading: boolean,
    allCurrencies: CurrenciesProps[],
    selectedCurrency: CurrenciesProps,
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
        let placeHolder = this.props.loading ? "Loading..." : `${this.props.selectedCurrency.symbol}    `;
        let options = this.props.loading ? [{ code: '', symbol: '' }] : this.props.allCurrencies;

        return (
            <nav className="App-header">
                <div className="burger-container">
                    <div className="burger"> <Lottie speed={this.state.isForward ? 1 : -1} options={this.defaultOptions} /></div>
                </div>
                <div className="Nav-links">
                    <div className="Nav-link-container">
                        <Link className="Nav-link" to="/Women">Women </Link>
                    </div>
                    <div className="Nav-link-container">
                        <Link to="/Men" className="Nav-link" >Men</Link>
                    </div>
                    <div className="Nav-link-container">
                        <Link to="/Kids" className="Nav-link">Kids</Link>
                    </div>
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
        selectedCurrency: state.currency.selectedCurrency
    }
}



export default connect(MapStateToProps)(NavBar)
