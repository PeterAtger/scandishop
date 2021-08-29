import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {
  ApolloProvider,
} from "@apollo/client";
import { Provider } from 'react-redux';

import client from './Data/Providers/ApolloClient'
import store from './Logic/Store/store';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


