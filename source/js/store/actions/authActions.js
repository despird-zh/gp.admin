import rpcapi from '../../rpcapi';

export const OPEN_SIGNIN_ACT  = 'OPEN_SIGNIN_ACT';
export const SIGNIN_ACT  = 'SIGNIN_ACT';
export const SIGNOFF_ACT = 'SIGNOFF_ACT';

export const AUTH_ACT_START = 'AUTH_ACT_START';
export const AUTH_ACT_END   = 'AUTH_ACT_END';

export const REISSUE_TOKEN_ACT = 'REISSUE_TOKEN_ACT';
export const FETCH_TOKEN_ACT   = 'FETCH_TOKEN_ACT';

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

export function signinAction(authbody) {
  return function (dispatch) {
    dispatch(authStart(authbody.principal));

    rpcapi.authApi.authenticate(authbody)
      .then(data => {
        dispatch(authEnd({data}))
      })
      .catch(error => {
        dispatch(authEnd({
          meta: {
            state: 'error',
            message: '无法连接服务器'
          },
          data: {}
        }))
      });
  };
}

export function signoffAction(principal) {
  return {
    type: SIGNIN_ACT,
    principal,
  };
}