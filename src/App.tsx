import React, { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from './View/assets/animations/burger.json';

import { APP_SVG } from './constants/images';
import ProductListing from './View/pages/Women/ProductListing';

type State = {
  isForward: boolean

}


class App extends Component<any, State> {

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
      <Router>
        <div className="App">
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
            <Link to="/Cart" className="Currency-cart"><APP_SVG.CART /></Link>
          </nav>

          <div className="Page">
            <Switch>
              <Route path="/Home">
                <ProductListing />
              </Route>
              <Route path="/Men">
                <Men />
              </Route>
              <Route path="/Kids">
                <Kids />
              </Route>
              <Route path="/Cart">
                <Cart />
              </Route>
            </Switch>
          </div>

        </div>
      </Router >
    );
  }
}

// To be replaced

function Men() {
  return <h2>Men</h2>;
}

function Kids() {
  return <h2>Kids</h2>;
}
function Cart() {
  return <h2>Cart</h2>;
}

export default App;
