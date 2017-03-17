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

  handleOpen = () => {
    this.props.openSigninAction(true);
  };

  handleClose = () => {
    this.props.openSigninAction(false);
  };

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
        onTouchTap={this.handleClose}
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
          />
          <TextField
            hintText="Please input password"
            type="password"
            floatingLabelText="Password"
            floatingLabelFixed={true}
          />
        </Dialog>
      </div>
    );
  }
}

SigninDialog.propTypes = {
  opening: PropTypes.bool,
  openSigninAction: PropTypes.func,
  signinAction: PropTypes.func,
  signoffAction: PropTypes.func,
};

export default connect(
  (state) => ({
    opening: state.auth.get('opening'),
  }),
  (dispatch) => (
    bindActionCreators({
      openSigninAction,
      signinAction,
      signoffAction
    }, dispatch)
  )
)(SigninDialog);