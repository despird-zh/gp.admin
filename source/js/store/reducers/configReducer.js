import { Map } from 'immutable';

import {
  CFG_SAVE_PROFILE
} from '../actions/configActions';

const initialState = Map({
  profile: {},
});

const actionsMap = {

  // Loader Action
  [CFG_SAVE_PROFILE]: (state, {type, data}) => {

    return state.merge({
      profile: data,
    });
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}