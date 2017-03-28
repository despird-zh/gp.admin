import 'es6-promise';
import 'whatwg-fetch';
import { BASE_URL } from './config';
/**
 * Normal logon process
 */
function authenticate(authbody) {

  let url = BASE_URL + 'authenticate.do';
  return fetch(url,{
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(authbody)
		}).then( response => response.json() );
}

/**
 * reissue a token before expire
 */
function reIssueToken(headers) {

  let url = BASE_URL + 'reissue.do';
  return fetch(url,{
		  method: 'POST',
		  headers: headers
		}).then( response => response.json() );
}

/**
 * refetch the token silently
 */
function reFetchToken(authbody) {

  let url = BASE_URL + 'authenticate.do';
  return fetch(url,{
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(authbody)
		}).then( response => response.json() );
}

/**
 * reissue a token before expire
 */
function signOff(headers) {

  let url = BASE_URL + 'logoff.do';
  return fetch(url,{
		  method: 'POST',
		  headers: headers
		}).then( response => response.json() );
}

export default {
  authenticate,
  reIssueToken,
  reFetchToken,
  signOff
};