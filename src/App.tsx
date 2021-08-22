import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <nav className="App-header">
        <div className="Nav-link-container">
          <a className="Nav-link" href="/html/">Women</a>
        </div>
        <div className="Nav-link-container">
          <a className="Nav-link" href="/css/">Men</a>
        </div>
        <div className="Nav-link-container">
          <a className="Nav-link" href="/js/">Kids</a>
        </div>
      </nav>
    </div>
  );
}


export default App;
