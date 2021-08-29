import { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ProductListing from './View/pages/ProductListing/ProductListing';
import fillCurrencies from './Data/Repositories/Currencies';
import store from './Logic/Store/store';
import NavBar from './View/global/NavBar';

type State = {
  loading: boolean

}

class App extends Component<any, State> {

  state: Readonly<State> = {
    loading: true
  }

  componentDidMount = async () => {
    await fillCurrencies()
    this.setState({ loading: false })
    console.log(store.getState())
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />

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
