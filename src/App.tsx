import React from 'react';
import './App.scss';
import { APP_SVG } from './constants/images';

function App() {
  return (
    <div className="App">
      <nav className="App-header">
        <div className="Nav-links">
          <div className="Nav-link-container">
            <a className="Nav-link" href="/html/">Women</a>
          </div>
          <div className="Nav-link-container">
            <a className="Nav-link" href="/css/">Men</a>
          </div>
          <div className="Nav-link-container">
            <a className="Nav-link" href="/js/">Kids</a>
          </div>
        </div>
        <APP_SVG.LOGO className="logo" />
        <div className="Currency-cart"><APP_SVG.CART /></div>
      </nav>
    </div>
  );
}


export default App;
