import React, { Component } from 'react'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { APP_SVG } from '../../constants/images';
import animationData from '../assets/animations/burger.json';

type State = {
    isForward: boolean

}

export class NavBar extends Component<any, State> {

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
                    <Link to="/Cart" ><APP_SVG.CART /></Link>
                </div>
            </nav>
        )
    }
}

export default NavBar
