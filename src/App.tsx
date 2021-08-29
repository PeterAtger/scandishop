import { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ProductListing from './View/pages/ProductListing/ProductListing';
import fillCurrencies from './Data/Repositories/Currencies';
import NavBar from './View/global/NavBar/NavBar';

type State = {
  loading: boolean
}

class App extends Component<any, State> {

  state: Readonly<State> = {
    loading: true
  }

  componentDidMount = async () => {
    await fillCurrencies().then(() => {
      this.setState({ loading: false })
    }
    )
  }

  render() {
    return (
      <Router>
        <div className="App" >
          <NavBar loading={this.state.loading} />

          <div className="Page">
            <Switch>
              <Route path="/Home">
                <ProductListing />
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

function Cart() {
  return <h2>Cart</h2>;
}

export default App;
