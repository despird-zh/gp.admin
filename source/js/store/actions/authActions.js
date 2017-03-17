export const OPEN_SIGNIN_ACT  = 'OPEN_SIGNIN_ACT';
export const SIGNIN_ACT  = 'SIGNIN_ACT';
export const SIGNOFF_ACT = 'SIGNOFF_ACT';

export const AUTH_ACT_START   = 'AUTH_ACT_START';
export const AUTH_ACT_ERROR   = 'AUTH_ACT_ERROR';
export const AUTH_ACT_SUCCESS = 'AUTH_ACT_SUCCESS';

export const REISSUE_TOKEN_ACT = 'REISSUE_TOKEN_ACT';
export const FETCH_TOKEN_ACT   = 'FETCH_TOKEN_ACT';

export function openSigninAction(show = true) {
  return {
    type: OPEN_SIGNIN_ACT,
    data: show,
  };
}

export function signinAction(principal) {
  return {
    type: SIGNIN_ACT,
    principal,
  };
}

export function signoffAction(principal) {
  return {
    type: SIGNIN_ACT,
    principal,
  };
}