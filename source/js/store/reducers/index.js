import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './appReducer';
import home from './homeReducer';

const rootReducer = combineReducers({
  app,
  home,
  routing: routerReducer,
});

export default rootReducer;
