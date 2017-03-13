import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/App';
import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='about' component={ AboutPage } />
  </Route>
);

