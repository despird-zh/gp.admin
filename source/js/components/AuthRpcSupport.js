import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openSigninAction, signinAction, signoffAction } from '../store/actions/authActions';

export default (ComposedComponent, actions) => {

	class NewComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = {};
        }

        isAuthenticated = () => {
            console.log('ssssssssssss');
            console.log(this.props);
        	return this.props.authenticated;
        }

        rpcInvoke = (action, databody) => {
        	Console.log(action);
        }

        render() {

            return <ComposedComponent {...this.props}
            {...this.state} 
            isAuthenticated = { this.isAuthenticated.bind(this) }
            rpcInovke = {this.rpcInvoke.bind(this)}
            />;
        }
	};

    return connect(
      (state) => ({
        opening: state.auth.get('opening'),
        audience: state.auth.get('audience'),
        authenticated: state.auth.get('authenticated'),
      }),
      (dispatch) => (
        bindActionCreators({
          openSigninAction,
          signoffAction,
          ...actions
        }, dispatch)
      )
    )(NewComponent);

}