import { Map, List } from 'immutable';

import {
  MST_SAVE_STORAGES
} from '../actions/masterActions';

const initialState = Map({
  storagelist: Map({ 
  	storages: List(), 
  })
});

const actionsMap = {

  // Loader Action
  [MST_SAVE_STORAGES]: (state, {type, data}) => {

    return state.setIn(['storagelist','storages'], data);
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}