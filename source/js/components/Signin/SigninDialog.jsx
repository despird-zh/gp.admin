import React , { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { openSigninAction, signinAction, signoffAction } from '../../store/actions/authActions';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const contentStyle = {
  width: 200,
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
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Custom Width"
          actions={actions}
          modal={true}
          contentStyle={contentStyle}
          open={this.props.opening}
          onRequestClose={this.handleClose}
        >
          This dialog spans the entire width of the screen.
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