import { combineReducers } from 'redux';

import app from './appReducer';
import dev from './devReducer';
import auth from './authReducer';
//import routing from './routeReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  app,
  dev,
  auth,
  routing:routerReducer,
});

export default rootReducer;
