import React , { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { openSigninAction, signinAction, signoffAction } from '../../store/actions/authActions';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  content: {
    width: 310,
  },
  title: {
    paddingBottom: 0
  },
  body: {
    paddingBottom: 10
  },
  actions: {
    paddingBottom:25,
    paddingLeft: 30,
    paddingRight: 30,
  }
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  };

  handleOpen = () => {
    this.props.openSigninAction(true);
  };

  handleClose = () => {
    this.props.openSigninAction(false);
  };

  handleChange = (e) => {
    let newstate = this.state;
    newstate[e.target.name] = e.target.value;
    this.setState(newstate);
  };

  handleSignin = () => {
    let authbody = {
      principal: this.state.account,
      credential: this.state.password,
      audience: this.props.audience
    };

    this.props.signinAction(authbody);
  }
  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Signin"
        primary={true}
        onTouchTap={this.handleSignin}
        disabled={this.state.account === '' || this.state.password === ''}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Welecome xxx"
          titleStyle={styles.title}
          actions={actions}
          actionsContainerStyle={styles.actions}
          modal={true}
          bodyStyle={styles.body}
          contentStyle={styles.content}
          open={this.props.opening}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="The user account"
            floatingLabelText="Account"
            floatingLabelFixed={true}
            name="account"
            defaultValue={this.state.account}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Please input password"
            type="password"
            name="password"
            defaultValue={this.state.password}
            floatingLabelText="Password"
            floatingLabelFixed={true}
            onChange={this.handleChange}
          />
        </Dialog>
      </div>
    );
  }
}

SigninDialog.propTypes = {
  opening: PropTypes.bool,
  audience: PropTypes.string,
  account: PropTypes.string,
  openSigninAction: PropTypes.func,
  signinAction: PropTypes.func,
  signoffAction: PropTypes.func,
};

export default connect(
  (state) => ({
    opening: state.auth.get('opening'),
    audience: state.auth.get('audience'),
  }),
  (dispatch) => (
    bindActionCreators({
      openSigninAction,
      signinAction,
      signoffAction
    }, dispatch)
  )
)(SigninDialog);