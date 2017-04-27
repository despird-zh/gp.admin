import { Map, List } from 'immutable';

import {
  MST_SAVE_STORAGES,
  MST_SAVE_STORAGES_FILTER,

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
    images: List(),

  }),
  orghier: Map({
    orgnodes: [{
        key: 'k1',
        title: 'Title1',
        icon: 'ActionSupervisorAccount',
      }, {
        key: 'k2',
        title: 'Title2 (5/41)',
        icon: 'SocialPeople',
        children: [
          {
            key: 'k21',
            title: 'Title21',
            icon: 'ActionSupervisorAccount',
          },
          {
            key: 'k22',
            title: 'Title22',
            icon: 'ActionSupervisorAccount',
          },
        ],
      }],
    orgmembers: [
      {
        id: 1,
        account: 'jsa',
        name: 'Juna Illa',
        avatar: 'assets/img/jsa-128.jpg',
      },
      {
        id: 2,
        account: 'kerem',
        name: 'Kerem Cliton',
        avatar: 'assets/img/kerem-128.jpg',
      },
      {
        id: 3,
        account: 'kolage',
        name: 'kolage Lun',
        avatar: 'assets/img/kolage-128.jpg',
      },
      {
        id: 4,
        account: 'ok',
        name: 'Ok Frendy',
        avatar: 'assets/img/ok-128.jpg',
      },
      {
        id: 5,
        account: 'raquelromanp',
        name: 'Raque Romanp',
        avatar: 'assets/img/raquelromanp-128.jpg',
      },
      {
        id: 6,
        account: 'uxceo',
        name: 'Juna Uxceo',
        avatar: 'assets/img/uxceo-128.jpg',
      },
      {
        id: 7,
        account: 'sds',
        name: 'Juna Illa',
        avatar: 'assets/img/jsa-128.jpg',
      }
    ],
  }),
});

const actionsMap = {

  // Loader Action
  [MST_SAVE_STORAGES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['storagelist', 'storages'], data);
  },
  [MST_SAVE_STORAGES_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'storagelist': data });
  },
  [MST_SAVE_DICTS]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['dictlist', 'entries'], data);
  },
  [MST_SAVE_DICTS_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'dictlist': data });
  },
  [MST_SAVE_ENTITIES]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.setIn(['dictlist', 'entries'], data);
  },
  [MST_SAVE_ENTITIES_FILTER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    return state.mergeDeep({ 'dictlist': data });
  },

  [MST_SAVE_ORGHIER]: (state, { type, data }) => { // eslint-disable-line no-unused-vars
    let newstate = state;
    
    if(data.orgmembers){
      newstate = state.setIn(['orghier','orgmembers'], data.orgmembers);
      delete data['orgmembers'];
    }
    if(data.orgnodes){
      newstate = newstate.setIn(['orghier','orgnodes'], data.orgnodes);
      delete data['orgnodes'];
    }
    return newstate.mergeDeep({ 'orghier': data });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
