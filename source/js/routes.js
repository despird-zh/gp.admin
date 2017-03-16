import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/App';
import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';

const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
const skipIfAuthenticated = (nextState, replace) => {
  if (store.getState().auth.token) {
    replace('/');
  }
};
const clearMessages = () => {
  store.dispatch({
    type: 'CLEAR_MESSAGES'
  });
};
/*<Route path='about' component={ AboutPage } onEnter={skipIfAuthenticated} onLeave={clearMessages} />*/
export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='about' component={ AboutPage } />
  </Route>
);

