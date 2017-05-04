import { Map } from 'immutable';

import {
  APP_SHOW_LOADER,
  APP_SHOW_SNACK,
  APP_ONLY_SNACK,
} from '../actions/appActions';

const initialState = Map({
  loaderOpen: false,
  loaderTip: '',
  snackOpen: false,
  snackTip: '',
});

const actionsMap = {

  // Loader Action
  [APP_SHOW_LOADER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      loaderOpen: data.shown,
      loaderTip: data.tip,
    });
  },

  // SnackBar Action
  [APP_SHOW_SNACK]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      snackOpen: data.shown,
      snackTip: data.tip,
    });
  },

  // SnackBar Action
  [APP_ONLY_SNACK]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.merge({
      loaderOpen: false,
      snackOpen: data.shown,
      snackTip: data.tip,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
