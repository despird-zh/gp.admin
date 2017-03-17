import 'es6-promise';
import 'whatwg-fetch';
import { BASE_URL } from './config';

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

export default {
  authenticate,
};