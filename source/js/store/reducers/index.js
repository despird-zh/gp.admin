import { combineReducers } from 'redux';

import app from './appReducer';
import home from './homeReducer';
import routing from './routeReducer';

const rootReducer = combineReducers({
  app,
  home,
  routing,
});

export default rootReducer;
