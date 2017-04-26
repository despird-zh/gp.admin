import { Map, List } from 'immutable';

import {
  MST_SAVE_STORAGES,
  MST_SAVE_DICTS,
  MST_SAVE_DICTS_FILTER,
  MST_CLEAR_DICTS_FILTER,
} from '../actions/masterActions';

const initialState = Map({
  storagelist: Map({
    storages: List(),
  }),
  dictlist: Map({
    entries: List(),
    search: '',
    group: '',
    language: 'en_us',
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
  [MST_SAVE_STORAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['storagelist', 'storages'], data);
  },
  [MST_SAVE_DICTS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['dictlist', 'entries'], data);
  },
  [MST_SAVE_DICTS_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'dictlist': data });
  },
  [MST_CLEAR_DICTS_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'dictlist': data });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
