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
      account: '',
      password: '',
    }
  }

  handleOpen = () => {
    this.props.openSigninAction(true);
  };

  handleClose = () => {
    this.props.openSigninAction(false);
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.state[name] = value;
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
        disabled={this.state.principal == '' || this.state.credential == ''}
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
            defaultValue={this.props.account}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Please input password"
            type="password"
            name="password"
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