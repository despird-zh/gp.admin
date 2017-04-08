import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/main';
import HomePage from './views/home';
import ConfigPage from './views/config/ConfigPage';
import SettingPage from './views/config/SettingPage';
import ProfilePage from './views/config/ProfilePage';

import SecurityPage from './views/security/SecurityPage';
import UserListPage from './views/security/UserListPage';
import UserEditPage from './views/security/UserEditPage';
import UserAddPage from './views/security/UserAddPage';

import WGroupAddPage from './views/wgroup/WGroupAddPage';
import WGroupEditPage from './views/wgroup/WGroupEditPage';
import WGroupListPage from './views/wgroup/WGroupListPage';
import WGroupPage from './views/wgroup/WGroupPage';

import DictListPage from './views/master/DictListPage';
import EntityListPage from './views/master/EntityListPage';
import ImageListPage from './views/master/ImageListPage';
import StorageListPage from './views/master/StorageListPage';
import MasterPage from './views/master/MasterPage';

import UserAuditPage from './views/audit/UserAuditPage';
import WGroupAuditPage from './views/audit/WGroupAuditPage';
import AuditPage from './views/audit/AuditPage';

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
      <Route path='useredit/:userId' component={ UserEditPage } />
      <Route path='useradd' component={ UserAddPage } />
    </Route>
    <Route path='wgroup' component={ WGroupPage }>
      <IndexRoute component={ WGroupListPage } />
      <Route path='wgrouplist' component={ WGroupListPage } />
      <Route path='wgroupadd' component={ WGroupAddPage } />
      <Route path='wgroupedit/:wgroupId' component={ WGroupEditPage } />
    </Route>
    <Route path='master' component={ MasterPage }>
      <IndexRoute component={ DictListPage } />
      <Route path='dictlist' component={ DictListPage } />
      <Route path='imagelist' component={ ImageListPage } />
      <Route path='entitylist' component={ EntityListPage } />
      <Route path='storageist' component={ StorageListPage } />
    </Route>
    <Route path='audit' component={ AuditPage }>
      <IndexRoute component={ WGroupAuditPage } />
      <Route path='wgroupaudit' component={ WGroupAuditPage } />
      <Route path='useraudit' component={ UserAuditPage } />
    </Route>
  </Route>
);

