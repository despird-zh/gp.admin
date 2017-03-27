import 'es6-promise';
import 'whatwg-fetch';
import { BASE_URL } from './config';

function queryUsers(headers, params) {
	
  let url = BASE_URL + 'users-query.do';
  return fetch(url,{
		  method: 'POST',
		  headers: headers,
		  body: JSON.stringify(params)
		}).then( response => response.json() );
}

export default {
  queryUsers
};