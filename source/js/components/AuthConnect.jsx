import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import { snackOnlyAction } from '../store/actions/appActions';
import { openSigninAction, 
				 signoffAction, 
				 saveToken} from '../store/actions/authActions';
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

	  rpcInvoke = (api, databody, callback) => {

	    if (this.props.authenticated) {
        let _tokenState = this.tokenState();

        if ( _tokenState === 'TO_BE_EXPIRE' ) {
        	let headers = this.rpcHeaders();

          this.reIssueToken({	headers, api, databody, callback  });
        } else if ( _tokenState === 'EXPIRED' ) {
        	let authbody = {
			      principal: this.props.account,
			      credential: this.props.credential,
			      audience: this.props.audience
			    };
          this.reFetchToken({	authbody, api, databody, callback });
        }else{
        	let headers = this.rpcHeaders();

        	this.callRpcApi({	headers, api, databody, callback });
      	}
      }else{
      	this.props.snackOnlyAction({show:true, snackTip: 'Please logon firstly!'});
      }
	  }

		reIssueToken = ({headers, api, postdata, resolve}) => {

	    API.authService.reIssueToken(headers).then((response) => {

	      this.props.saveToken(response.data);

	      headers.Authorization= 'Bearer: ' + response.data,

	      api(headers, postdata)
	        .then(resolve)
	        .catch( error => trapCatch( error) );

	    })
	    .catch( error => trapCatch( error) );
		}

		reFetchToken = ({authbody, api, postdata, resolve}) => {

	    API.authService.reFetchToken(authbody).then((response) => {

	      this.props.saveToken(response.data);
	      let headers = {
	              Authorization: 'Bearer: ' + response.data,
	              Accept: 'application/json'
	            };

	      api(headers, postdata)
	        .then(resolve)
	        .catch( error => trapCatch( error) );

	    })
	    .catch( error => trapCatch( error) );

		}

	  callRpcApi = (headers, api, postdata, resolve) => {
		  
		    api(headers, postdata)
		        .then(resolve)
		        .catch( error => trapCatch(error) );
		}

		trapCatch(error){
			this.props.snackOnlyAction({show:true, snackTip: '无法连接服务器'})
		}

	  render() {

	    return <ComposedComponent { ...this.props }
	      { ...this.state } 
	      tokenState = { this.tokenState }
	      rpcInvoke = { this.rpcInvoke }
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
	      saveToken,
	      snackOnlyAction,
	      ...actions
	    }, dispatch)
	  )
	)(NewComponent);

}