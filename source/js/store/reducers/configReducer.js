import { Map } from 'immutable';

import {
  CFG_SAVE_PROFILE,
  CFG_SAVE_SETTINGS
} from '../actions/configActions';

const initialState = Map({
  profile: Map(),
  settings: [],
});

const actionsMap = {

  // Loader Action
  [CFG_SAVE_PROFILE]: (state, {type, data}) => {

    return state.mergeDeep({
      profile: data,
    });
  },

  [CFG_SAVE_SETTINGS]: (state, {type, data}) => {

    return state.merge({
      settings: data,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}