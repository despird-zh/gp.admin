import { combineReducers } from 'redux';

import app from './appReducer';
import dev from './devReducer';
import auth from './authReducer';
import config from './configReducer';
import security from './securityReducer';
import wgroup from './wgroupReducer';
//import routing from './routeReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  app,
  dev,
  auth,
  config,
  security,
  wgroup,
  routing:routerReducer,
});

export default rootReducer;
