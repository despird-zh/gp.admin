import { Map, List } from 'immutable';

import {
  SEC_SAVE_USERS, SEC_SAVE_USER, SEC_SAVE_USER_MODE, SEC_SAVE_FILTER, SEC_CLEAR_SEARCH
} from '../actions/securityActions';

const initialState = Map({
  userlist: Map({ 
  	users: List(), 
  	search: '', 
  	internal: false, 
  	external: false,
  }),
  userinfo: Map({
    user: Map(),
    mode: 'edit',
  }),
});

const actionsMap = {

  [SEC_SAVE_USERS]: (state, {type, data}) => {
    return state.setIn(['userlist','users'], data);
  },

 	[SEC_SAVE_FILTER]: (state, {type, data}) => {

    return state.mergeDeep({'userlist': data});
  },

  [SEC_SAVE_USER]: (state, {type, data}) => {

    return state.mergeDeep({'userinfo': { 'user':data} });
  },

  [SEC_SAVE_USER_MODE]: (state, {type, data}) => {

    return state.setIn(['userinfo','mode'], data);
  },

  [SEC_CLEAR_SEARCH]: (state, {type, data}) => {
    
    let newState = state.mergeDeep({'userlist': data});
    return newState.setIn(['userlist','users'], List());
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}