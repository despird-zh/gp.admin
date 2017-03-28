import { Map, List } from 'immutable';

import {
  SEC_SAVE_USERS, SEC_SAVE_USER, SEC_SAVE_FILTER, SEC_CLEAR_SEARCH
} from '../actions/securityActions';

const initialState = Map({
  userlist: Map({ 
  	users: List(), 
  	search: '', 
  	internal: false, 
  	external: false,
  }),
  useredit: Map(),
});

const actionsMap = {

  // Loader Action
  [SEC_SAVE_USERS]: (state, {type, data}) => {

    return state.setIn(['userlist','users'], data);

  },
 	[SEC_SAVE_FILTER]: (state, {type, data}) => {

    return state.mergeDeep({
      userlist: data
    });
  },
// Loader Action
  [SEC_SAVE_USER]: (state, {type, data}) => {

    return state.mergeDeep({
      useredit: data,
    });
  },

  [SEC_CLEAR_SEARCH]: (state, {type, data}) => {

    let newState = state.mergeDeep({
      userlist: data
    });
    return newState.setIn(['userlist','users'], List());
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}