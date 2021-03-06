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
import fetchCategories, { fetchCategoryNames } from './Data/Repositories/Categories';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from './Logic/Store/store';
import { setLoading } from './Logic/Store/LoadingReducer';
import ProductDetails from './View/pages/ProductDetails/ProductDetails';
import CheckOut from './View/pages/CheckOut/CheckOut';


class App extends Component<any> {



  componentDidMount = async () => {
    try {
      await fetchCurrencies()
      await fetchCategoryNames()
      await fetchCategories(this.props.allCategories[this.props.selectedCategory].name)
      this.props.setLoading(false)
    } catch (error: any) {
      alert("Please check your connection")
      throw new Error(error)
    }

  }

  render() {
    return (
      <Router>
        <div className="App" >
          <NavBar />
          <div className="Page">
            <Switch>
              <Route exact path="/">
                <ProductListing />
              </Route>
              <Route exact path="/ProductDetails">
                <ProductDetails />
              </Route>
              <Route exact path="/Cart">
                <CheckOut />
              </Route>
            </Switch>
          </div>
        </div>
      </Router >
    );
  }
}


const MapStateToProps = (state: RootState) => {
  return {
    loading: state.loading.isLoading,
    allCategories: state.categories.allCategories,
    selectedCategory: state.categories.selectedCategory,
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
