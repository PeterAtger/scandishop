import { Component } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ProductListing from './View/pages/ProductListing/ProductListing';
import fetchCurrencies from './Data/Repositories/Currencies';
import NavBar from './View/global/NavBar/NavBar';
import fetchCategories from './Data/Repositories/Categories';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from './Logic/Store/store';
import { setLoading } from './Logic/Store/LoadingReducer';


class App extends Component<any> {



  componentDidMount = async () => {
    try {
      await fetchCurrencies()
      await fetchCategories()
      this.props.setLoading(false)
    } catch (e) {
      alert("Please check your connection")
      throw new Error(e)
    }

  }

  render() {
    return (
      <Router>
        <div className="App" >
          <NavBar />

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

const MapStateToProps = (state: RootState) => {
  return {
    loading: state.loading.isLoading
  }
}

const MapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setLoading: (state: boolean) => {
      dispatch(setLoading(state))
    }
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(App);
