import API from '../../rpcapi';
import { loaderAction, snackAction, snackOnlyAction } from './appActions';

export const OPEN_SIGNIN_ACT  = 'OPEN_SIGNIN_ACT';
export const SIGNIN_ACT  = 'SIGNIN_ACT';
export const SIGNOFF_ACT = 'SIGNOFF_ACT';
export const SAVE_TOKEN_ACT = 'SAVE_TOKEN_ACT';

export const AUTH_ACT_START = 'AUTH_ACT_START';
export const AUTH_ACT_END   = 'AUTH_ACT_END';

export const REISSUE_TOKEN_ACT = 'REISSUE_TOKEN_ACT';
export const FETCH_TOKEN_ACT   = 'FETCH_TOKEN_ACT';

const START_LOADER = loaderAction({shown: true, loaderTip: 'Start RPC Invoking'});
const END_LOADER = loaderAction({shown: false, loaderTip: 'End RPC Invoking'});

export function openSigninAction(show = true) {
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
    data: data,
  };
}

function saveToken(data) {
  return {
    type: SAVE_TOKEN_ACT,
    data: data,
  };
}

function trapCatch(dispatch, error, isAuthRpc = false) {
  if(isAuthRpc){
    dispatch(authEnd({
      meta: {
        state: 'error',
        message: '无法连接服务器'
      },
      data: null
    }));
  } else{
    let snackMsg = snackOnlyAction({snackTip: '无法连接服务器'});
    dispatch(snackMsg);
  }
}

export function reIssueToken({headers, api, postbody, callback}) {

  return (dispatch) => {

    API.authService.reIssueToken(headers).then((response) => {

      dispatch(saveToken(response.data))

      headers.Authorization= 'Bearer: ' + response.data,

      api(headers, postbody)
        .then(callback)
        .catch( error => trapCatch( dispatch, error) );

    })
    .catch( error => trapCatch( dispatch, error) );
  };
}

export function reFetchToken({authbody, api, postbody, callback}) {

  return (dispatch) => {

    API.authService.reFetchToken(authbody).then((response) => {

      dispatch(saveToken(response.data))
      let headers = {
              Authorization: 'Bearer: ' + response.data,
              Accept: 'application/json'
            };

      api(headers, postbody)
        .then(callback)
        .catch( error => trapCatch( dispatch, error) );

    })
    .catch( error => trapCatch( dispatch, error) );
  };
}

export function callRpcApi({headers, api, postbody, callback}) {
  return (dispatch) => {
    dispatch(START_LOADER);
    api(headers, postbody)
        .then(callback)
        .then(() => {dispatch(END_LOADER);})
        .catch( error => trapCatch( dispatch, error) );
  };
}

export function signinAction(authbody) {
  return (dispatch) => {
    dispatch(authStart(authbody.principal));

    API.authService.authenticate(authbody)
      .then(data => {
        
        dispatch(saveToken({
          credential: authbody.credential,
          token: data.data,
        }));
        dispatch(authEnd(data))
      })
      .catch( error => trapCatch( dispatch, error, true) );
  };
}

export function signoffAction(principal) {
  return {
    type: SIGNIN_ACT,
    principal,
  };
}