import { Map } from 'immutable';

import {
  APP_SHOW_LOADER,
  APP_SHOW_SNACK,
  APP_ONLY_SNACK,
  CMN_FETCH_STORAGES,
} from '../actions/appActions';

const initialState = Map({
  loaderOpen: false,
  loaderTip: '',
  snackOpen: false,
  snackTip: '',
  storages: []
});

const actionsMap = {

  // Loader Action
  [APP_SHOW_LOADER]: (state, {type, data}) => {

    return state.merge({
      loaderOpen: data.shown,
      loaderTip: data.tip,
    });
  },

  // SnackBar Action
  [APP_SHOW_SNACK]: (state, {type, data}) => {
    return state.merge({
      snackOpen: data.shown,
      snackTip: data.tip,
    });
  },
  
  // SnackBar Action
  [APP_ONLY_SNACK]: (state, {type, data}) => {
    return state.merge({
      loaderOpen: false,
      snackOpen: data.shown,
      snackTip: data.tip,
    });
  },

  [CMN_FETCH_STORAGES]: (state, {type, data}) => {

    return state.merge({
      storages: data
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
