import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openSignin, signin } from '../../store/actions/authActions';

const styles = {
  content: {
    width: 310,
  },
  title: {
    paddingBottom: 0,
  },
  body: {
    paddingBottom: 10,
  },
  actions: {
    paddingBottom: 25,
    paddingLeft: 30,
    paddingRight: 30,
  },
  loading: {
    float: 'left',
    marginTop: 6,
  },
  msg: {
    marginTop: 10,
  },
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class SigninDialog extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      account: 'dev1',
      password: '1',
      ready: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleOpen = () => {
    this.props.openSignin(true);
  };

  handleClose = () => {
    this.props.openSignin(false);
  };

  handleChange = (e) => {
    const newstate = this.state;
    newstate[e.target.name] = e.target.value;
    this.setState(newstate);
  };

  handleSignin = () => {
    const authbody = {
      principal: this.state.account,
      credential: this.state.password,
      audience: this.props.audience,
    };

    this.props.signin(authbody);
  }
  render() {
    const actions = [
      (this.props.authing ? <FontIcon className='fa fa-spinner fa-spin' style={ styles.loading } /> : null),
      <FlatButton
        label='Cancel'
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label='Signin'
        primary={ true }
        onTouchTap={ this.handleSignin }
        disabled={ this.state.account === '' || this.state.password === '' }
      />,
    ];
    return (
      <div>
        <Dialog
          title='Welcome to GPress'
          titleStyle={ styles.title }
          actions={ actions }
          actionsContainerStyle={ styles.actions }
          modal={ true }
          bodyStyle={ styles.body }
          contentStyle={ styles.content }
          open={ this.props.opening }
          onRequestClose={ this.handleClose }
        >
          {this.props.message === '' ? null : <span style={ styles.msg }>{this.props.message}</span>}
          <TextField
            hintText='The user account'
            floatingLabelText='Account'
            floatingLabelFixed={ true }
            name='account'
            defaultValue={ this.state.account }
            onChange={ this.handleChange }
          />
          <TextField
            hintText='Please input password'
            type='password'
            name='password'
            defaultValue={ this.state.password }
            floatingLabelText='Password'
            floatingLabelFixed={ true }
            onChange={ this.handleChange }
          />
        </Dialog>
      </div>
    );
  }
}

SigninDialog.propTypes = {
  opening: PropTypes.bool,
  authing: PropTypes.bool,
  audience: PropTypes.string,
  message: PropTypes.string,
  openSignin: PropTypes.func,
  signin: PropTypes.func,
};

export default connect(
  (state) => ({
    opening: state.auth.get('opening'),
    authing: state.auth.get('authing'),
    audience: state.auth.get('audience'),
    message: state.auth.get('message'),
  }),
  (dispatch) => (
    bindActionCreators({
      openSignin,
      signin,
    }, dispatch)
  )
)(SigninDialog);
