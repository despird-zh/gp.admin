import 'es6-promise';
import 'whatwg-fetch';
import { BASE_URL } from './config';

function queryProfile(headers, params) {
	
  let url = BASE_URL + 'ent-profile-query.do';
  return fetch(url,{
		  method: 'POST',
		  headers: headers,
		  body: JSON.stringify(params)
		}).then( response => response.json() );
}

function querySysOptions(headers, params) {
	
  let url = BASE_URL + 'sys-opts-query.do';
  return fetch(url,{
		  method: 'POST',
		  headers: headers,
		  body: JSON.stringify(params)
		}).then( response => response.json() );
}

export default {
  queryProfile, querySysOptions
};