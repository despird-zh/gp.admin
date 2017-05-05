import { Map, List } from 'immutable';

import {
  MST_SAVE_STORAGES,

  MST_SAVE_IMAGES,
  MST_SAVE_IMAGES_FILTER,

  MST_SAVE_DICTS,
  MST_SAVE_DICTS_FILTER,

  MST_SAVE_ENTITIES,
  MST_SAVE_ENTITIES_FILTER,

  MST_SAVE_ORGHIER,
} from '../actions/masterActions';

const initialState = Map({

  storagelist: Map({
    storages: List(),
    type: '',
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
    images: [],
    category: '',
    format: '',
  }),
  orghier: Map({
    orgnodes: [],
    orgmembers: [],
    infomode: 'mbr-add',
    orgadd: {},
    orgedit: {},
    memberadd: {},
  }),
});

const actionsMap = {

  // Loader Action
  [MST_SAVE_STORAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations( (map) => {
      if(data.storages){
        map.setIn(['storagelist', 'storages'], data.storages);
        delete data['storages'];
      }
      map.mergeDeep({ 'storagelist': data });
    });
  },

  // Loader Action
  [MST_SAVE_IMAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations( (map) => {
      if(data.images){
        map.setIn(['imagelist', 'images'], data.images);
        delete data['images'];
      }
      map.mergeDeep({ 'imagelist': data });
    });
  },

  [MST_SAVE_DICTS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations( (map) => {
      if(data.entries){
        map.setIn(['dictlist', 'entries'], data.entries);
        delete data['entries'];
      }
      map.mergeDeep({ 'dictlist': data });
    });
  },

  [MST_SAVE_ENTITIES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['dictlist', 'entries'], data);
  },
  [MST_SAVE_ENTITIES_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'dictlist': data });
  },

  [MST_SAVE_ORGHIER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.withMutations( (map) => {
      if(data.orgmembers){
        map.setIn(['orghier','orgmembers'], data.orgmembers);
        delete data['orgmembers'];
      }
      if(data.orgnodes){
        map.setIn(['orghier','orgnodes'], data.orgnodes);
        delete data['orgnodes'];
      }
      if(data.orgadd){
        map.setIn(['orghier','orgadd'], data.orgadd);
        delete data['orgadd'];
      }
      if(data.orgedit){
        map.updateIn(['orghier','orgedit'], value => { 
          return Object.assign(value, data.orgedit);
        });
        delete data['orgedit'];
      }
      if(data.memberadd){
        map.setIn(['orghier','memberadd'], data.memberadd);
        delete data['memberadd'];
      }
      map.mergeDeep({ 'orghier': data });
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
