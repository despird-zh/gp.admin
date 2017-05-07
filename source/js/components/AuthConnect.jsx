import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import { snackOnlyAction } from '../store/actions/appActions';
import { openSignin,
         signoff,
         reIssueToken,
         reFetchToken,
         callRpcApi } from '../store/actions/authActions';
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
        Authorization: `Bearer: ${ this.props.jwttoken }`,
        Accept: 'application/json',
      };
    }

    tokenState = () => {
      //console.log(this.props.jwttoken);
      const parseToken = jwtDecode(this.props.jwttoken);
      const currTimestamp = Math.floor(Date.now() / 1000);

      if (currTimestamp - parseToken.exp < 5 * 60 && currTimestamp - parseToken.exp > 0) {
        return 'TO_BE_EXPIRE';
      } else if (currTimestamp - parseToken.exp >= 5 * 60) {
        return 'EXPIRED';
      }
      return 'NORMAL';
    };

    rpcInvoke = (apiname, postbody, action, silent = true, raw = false) => {
      if (this.props.authenticated) {
        const tkState = this.tokenState();

        if (tkState === 'TO_BE_EXPIRE') {
          const headers = this.rpcHeaders();

          this.props.reIssueToken({ headers, apiname, postbody, action, silent, raw });
        } else if (tkState === 'EXPIRED') {
          const authbody = {
            principal: this.props.account,
            credential: this.props.credential,
            audience: this.props.audience,
          };
          this.props.reFetchToken({ authbody, apiname, postbody, action, silent, raw });
        } else {
          const headers = this.rpcHeaders();

          this.props.callRpcApi({ headers, apiname, postbody, action, silent, raw });
        }
      } else {
        this.props.snackOnlyAction({ show: true, snackTip: 'Please logon firstly!' });
      }
    }

    mapJson = (map, propkeys) => {
      let rtv = {};
      for(let propkey of propkeys){
        rtv[propkey] = map.get(propkey);
      }
      return rtv;
    }

    render() {
      return (<ComposedComponent
        { ...this.props }
        ref={ this.props.innerRef }
        { ...this.state }
        tokenState={ this.tokenState }
        rpcInvoke={ this.rpcInvoke }
        rpcHeaders={ this.rpcHeaders }
        mapJson= { this.mapJson }
      />);
    }
  }

  NewComponent.propTypes = {
    jwttoken: PropTypes.string,
    authenticated: PropTypes.bool,
    reIssueToken: PropTypes.func,
    account: PropTypes.string,
    credential: PropTypes.string,
    audience: PropTypes.string,
    reFetchToken: PropTypes.func,
    callRpcApi: PropTypes.func,
    snackOnlyAction: PropTypes.func,
    innerRef: PropTypes.func,
  };

  return connect(
    (state) => {
      const extraStateMap = stateMap ? stateMap(state) : null;
      return {
        account: state.auth.get('account'),
        credential: state.auth.get('credential'),
        audience: state.auth.get('audience'),
        jwttoken: state.auth.get('jwttoken'),
        authenticated: state.auth.get('authenticated'),
        ...extraStateMap,
      };
    },
    (dispatch) => (
      bindActionCreators({
        openSignin,
        signoff,
        reIssueToken,
        reFetchToken,
        callRpcApi,
        snackOnlyAction,
        ...actions,
      }, dispatch)
    )
  )(NewComponent);
};
