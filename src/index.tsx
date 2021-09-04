import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {
  ApolloProvider,
} from "@apollo/client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


import client from './Data/Providers/ApolloClient'
import store, { persistor } from './Logic/Store/store';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


