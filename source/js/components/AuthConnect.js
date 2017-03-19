import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openSigninAction, signoffAction } from '../store/actions/authActions';
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
	  
	  invokeRPC = (action, databody) => {
	  	
	    Console.log(action);
	  }

	  render() {

	    return <ComposedComponent {...this.props}
	      {...this.state} 
	      isAuthenticated = { this.isAuthenticated}
	      rpcInovke = {this.invokeRPC}
	    />;
	  }
	};

	return connect(
	  (state) => {
	    let extraStateMap = stateMap ? stateMap(state) : null;
	    return {
	        opening: state.auth.get('opening'),
	        audience: state.auth.get('audience'),
	        authenticated: state.auth.get('authenticated'),
	        ...extraStateMap
	      }
	  },
	  (dispatch) => (
	    bindActionCreators({
	      openSigninAction,
	      signoffAction,
	      ...actions
	    }, dispatch)
	  )
	)(NewComponent);

}