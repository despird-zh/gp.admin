/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'babel-polyfill';
import { getRoutes } from './routes';
import configureStore from './store/configureStore';

import '../scss/app.scss'; // Yep, that's right.

require('../assets/favicon.ico'); // Tell webpack to load favicon.ico

// Create a store for application
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={ store }>
    <Router history={ history }>
      { getRoutes(store) }
    </Router>
  </Provider>, document.getElementById('root')
);
