import 'es6-promise';
import 'whatwg-fetch';
import { loaderAction, snackOnlyAction } from './appActions';

export const OPEN_SIGNIN_ACT = 'OPEN_SIGNIN_ACT';
export const SIGNIN_ACT = 'SIGNIN_ACT';
export const SIGNOFF_ACT = 'SIGNOFF_ACT';
export const SAVE_TOKEN_ACT = 'SAVE_TOKEN_ACT';
export const PURGE_TOKEN_ACT = 'PURGE_TOKEN_ACT';

export const AUTH_ACT_START = 'AUTH_ACT_START';
export const AUTH_ACT_END = 'AUTH_ACT_END';

export const REISSUE_TOKEN_ACT = 'REISSUE_TOKEN_ACT';
export const FETCH_TOKEN_ACT = 'FETCH_TOKEN_ACT';

const BASE_URL = 'http://localhost:8010/gpapi/';
const START_LOADER = loaderAction({ shown: true, loaderTip: 'Start RPC Invoking' });
const END_LOADER = loaderAction({ shown: false, loaderTip: 'End RPC Invoking' });

export function openSignin(show = true) {
  return {
    type: OPEN_SIGNIN_ACT,
    data: show,
  };
}

function authStart(account) {
  return {
    type: AUTH_ACT_START,
    data: account,
  };
}

function authEnd(data) {
  return {
    type: AUTH_ACT_END,
    data,
  };
}

function saveToken(data) {
  return {
    type: SAVE_TOKEN_ACT,
    data,
  };
}

function purgeToken() {
  return {
    type: PURGE_TOKEN_ACT,
  };
}

function trapCatch(dispatch, error, isAuthRpc = false) {
  if (isAuthRpc) {
    dispatch(authEnd({
      meta: {
        state: 'error',
        message: '无法连接服务器',
      },
      data: null,
    }));
  } else {
    const snackMsg = snackOnlyAction({ snackTip: '无法连接服务器' });
    dispatch(snackMsg);
  }
  dispatch(END_LOADER);
}

function trapResolve(dispatch, json, action, raw = false) {
  if (action && !raw) {
    const actionObj = action(json.data);
    if (actionObj) {
      dispatch(actionObj);
    }
  } else if (action && raw) {
    const actionObj = action(json);
    if (actionObj) {
      dispatch(actionObj);
    }
  }
  dispatch(END_LOADER);
}

export function reIssueToken({ headers, apiname, postbody, action, silent = true, raw = false }) {
  return (dispatch) => {
    if (!silent) {
      dispatch(START_LOADER);
    }
    let url = `${ BASE_URL }reissue.do`;
    fetch(url, {
      method: 'POST',
      headers,
    })
    .then(response => response.json())
    .then(json => {
      dispatch(saveToken(json.data));

      headers.Authorization = `Bearer: ${ json.data }`,
      url = BASE_URL + apiname;
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(postbody),
      })
      .then(response => response.json())
      .then(json => trapResolve(dispatch, json, action, raw))
      .catch(error => trapCatch(dispatch, error));
    })
    .catch(error => trapCatch(dispatch, error));
  };
}

export function reFetchToken({ authbody, apiname, postbody, action, silent = true, raw = false }) {
  return (dispatch) => {
    if (!silent) {
      dispatch(START_LOADER);
    }
    let url = `${ BASE_URL }authenticate.do`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authbody),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(saveToken(json.data));
      const headers = {
        Authorization: `Bearer: ${ json.data }`,
        Accept: 'application/json',
      };
      url = BASE_URL + apiname;
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(postbody),
      })
      .then(response => response.json())
      .then(json => trapResolve(dispatch, json, action, raw))
      .catch(error => trapCatch(dispatch, error));
    })
    .catch(error => trapCatch(dispatch, error));
  };
}

export function callRpcApi({ headers, apiname, postbody, action, silent = true, raw = false }) {
  return (dispatch) => {
    if (!silent) {
      dispatch(START_LOADER);
    }
    const url = BASE_URL + apiname;
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(postbody),
    })
    .then(response => response.json())
    .then(json => trapResolve(dispatch, json, action, raw))
    .catch(error => trapCatch(dispatch, error));
  };
}

export function signin(authbody) {
  return (dispatch) => {
    dispatch(authStart(authbody.principal));

    const url = `${ BASE_URL }authenticate.do`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authbody),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(saveToken({
        credential: authbody.credential,
        token: json.data,
      }));
      dispatch(authEnd(json));
    })
    .catch(error => trapCatch(dispatch, error, true));
  };
}

export function signoff({ principal }) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const headers = {
      Authorization: `Bearer: ${ auth.get('jwttoken') }`,
      Accept: 'application/json',
    };

    const url = `${ BASE_URL }logoff.do`;
    return fetch(url, {
      method: 'GET',
      headers,
    })
    .then(response => response.json())
    .then(json => {
      dispatch(purgeToken());
      dispatch(snackOnlyAction({ snackTip: json.meta.message }));
    })
    .catch(error => trapCatch(dispatch, error, true));
  };
}
