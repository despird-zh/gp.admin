import { Map, List } from 'immutable';

import {
  MST_SAVE_STORAGES
} from '../actions/masterActions';

const initialState = Map({
  storagelist: Map({ 
  	storages: List(), 
  }),
  dictlist: Map({
    entries: List(),

  }),
  entitylist: Map({
    entities: List(),

  }),
  imagelist: Map({
    images: List(),

  }),
  orghier: Map({
    orgtree: {},
  }),
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