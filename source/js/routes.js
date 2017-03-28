import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/main';
import HomePage from './views/home';
import ConfigPage from './views/config/ConfigPage';
import SettingPage from './views/config/SettingPage';
import ProfilePage from './views/config/ProfilePage';

import SecurityPage from './views/security/SecurityPage';
import UserListPage from './views/security/UserListPage';
import UserInfoPage from './views/security/UserInfoPage';

import DevPage from './views/DevPage';
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
    <Route path='dev' component={ DevPage } />
    <Route path='about' component={ AboutPage } />
    <Route path='config' component={ ConfigPage }>
      <IndexRoute component={ ProfilePage } />
      <Route path='setting' component={ SettingPage } />
      <Route path='profile' component={ ProfilePage } />
    </Route>
    <Route path='security' component={ SecurityPage }>
      <IndexRoute component={ UserListPage } />
      <Route path='userlist' component={ UserListPage } />
      <Route path='userinfo/:account' component={ UserInfoPage } />
    </Route>
  </Route>
);

