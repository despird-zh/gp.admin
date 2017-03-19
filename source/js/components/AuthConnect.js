import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import API from '../rpcapi';
import { openSigninAction, signoffAction, reIssueToken, reFetchToken, callRpcApi } from '../store/actions/authActions';
/**
 * here create a new HOC to complete the connect and api invoking
 * stateMap is the normal map of state
 * actions is the object of actions to be mapped
 */
export default (ComposedComponent, stateMap, actions) => {

	class NewComponent extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {};
	  }

	  isAuthenticated = () => {
	    return this.props.authenticated;
	  }
	  
	  rpcHeaders = () => {
	  	return {
        Authorization: 'Bearer: ' + this.props.jwttoken,
        Accept: 'application/json'
      };
	  }

	  tokenState = () => {

		  let parseToken = jwtDecode(this.props.jwttoken);
		  let currTimestamp = Math.floor(Date.now() / 1000);

		  if (currTimestamp - parseToken.exp < 5 * 60 && currTimestamp - parseToken.exp > 0) {
		    return 'TO_BE_EXPIRE';
		  } else if (currTimestamp - parseToken.exp >= 5 * 60) {
		    return 'EXPIRED';
		  }
		  return 'NORMAL';

		};

	  invokeRPC = (api, databody, callback) => {
	  	
	    if (this.props.authenticated) {
        let _tokenState = this.props.tokenState();

        if ( _tokenState === 'TO_BE_EXPIRE' ) {
        	let headers = this.props.rpcHeaders();

          this.props.reIssueToken({
          	headers, 
          	api, 
          	databody, 
          	callback
          });
        } else if ( _tokenState === 'EXPIRED' ) {
        	let authbody = {
			      principal: this.props.account,
			      credential: this.props.credential,
			      audience: this.props.audience
			    };
          this.props.reFetchToken({
          	authbody, 
          	api, 
          	databody, 
          	callback
          });
        }else{
        	let headers = this.props.rpcHeaders();

        	this.props.callRpcApi({
          	headers, 
          	api, 
          	databody, 
          	callback
          });
      	}
      }
	  }

	  render() {

	    return <ComposedComponent { ...this.props }
	      { ...this.state } 
	      isAuthenticated = { this.isAuthenticated }
	      toeknState = { this.tokenStake }
	      rpcInovke = { this.invokeRPC }
	      rpcHeaders = { this.rpcHeaders }
	    />;
	  }
	};

	return connect(
	  (state) => {
	    let extraStateMap = stateMap ? stateMap(state) : null;
	    return {
	        account: state.auth.get('account'),
	        credential: state.auth.get('credential'),
	        audience: state.auth.get('audience'),
	        jwttoken: state.auth.get('jwttoken'),
	        authenticated: state.auth.get('authenticated'),
	        ...extraStateMap
	      }
	  },
	  (dispatch) => (
	    bindActionCreators({
	      openSigninAction,
	      signoffAction,
	      reIssueToken,
	      reFetchToken,
	      callRpcApi,
	      ...actions
	    }, dispatch)
	  )
	)(NewComponent);

}