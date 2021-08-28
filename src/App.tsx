import React, { useState } from 'react';
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
import Women from './View/pages/Women/Women';


function App() {
  const [isForward, setIsForward] = useState(true)

  const defaultOptions = {
    animationData: animationData,
    loop: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="App-header">
          <div className="burger-container">
            <div className="burger"> <Lottie speed={isForward ? 1 : -1} options={defaultOptions} /></div>
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
          <APP_SVG.LOGO className="logo" onClick={() => { setIsForward(!isForward); }} />
          <Link to="/Cart" className="Currency-cart"><APP_SVG.CART /></Link>
        </nav>

        <div className="Page">
          <Switch>
            <Route path="/Women">
              <Women />
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
    </Router>
  );
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
