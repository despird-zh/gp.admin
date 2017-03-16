import { combineReducers } from 'redux';

import app from './appReducer';
import home from './homeReducer';
import auth from './authReducer';
//import routing from './routeReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  app,
  home,
  auth,
  routing:routerReducer,
});

export default rootReducer;
