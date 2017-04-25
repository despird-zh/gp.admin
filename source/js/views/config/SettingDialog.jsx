import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AuthConnect from '../../components/AuthConnect';
import { ConfigApis } from '../../store/actions/configActions';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class SettingDialog extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      setting: { group: '', option: '', value: '', description: '' },
    };
  }

  styles = {
    itemStyle: { marginRight: 16 },
    contentStyle: { width: 580 },
  };

  handleOpen = (setting) => {
    this.setState({ open: true, setting });
  };

  handleClose = () => {
    const newState = Object.assign({}, this.state, { open: false });
    this.setState(newState);
  };

  handleSave = () => {
    const newState = Object.assign({}, this.state, { open: false });
    this.setState(newState);
    this.props.rpcInvoke(ConfigApis.SysOptSave, this.state.setting,
    (json) => {
      this.props.snackOnlyAction({ show: true, snackTip: json.meta.message });
    },
    false,
    true);
  };

  handleChange = (event, newVal, payload) => {
    console.log(payload);
    const newState = Object.assign({}, this.state);
    newState.setting.value = newVal;
    this.setState(newState);
  };

  render() {
    const actions = [
      <FlatButton
        label='Close'
        style={ { marginRight: 15 } }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label='Save'
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleSave }
      />,
    ];

    return (

      <Dialog
        title='Edit the system setting'
        actions={ actions }
        modal={ false }
        contentStyle={ this.styles.contentStyle }
        open={ this.state.open }
        onRequestClose={ this.handleClose }
      >
        <div>
          <TextField
            defaultValue='Group'
            floatingLabelText='Option Group'
            style={ this.styles.itemStyle }
            value={ this.state.setting.group }
          />
          <TextField
            defaultValue='Default Value'
            floatingLabelText='Option code'
            value={ this.state.setting.option }
          />
        </div>
        <div>
          <TextField
            defaultValue='Default Value'
            floatingLabelText='Option value'
            onChange={ this.handleChange }
            value={ this.state.setting.value }
          />
        </div>
        <div>
          <TextField
            defaultValue='Default Value'
            floatingLabelText='Description'
            style={ { width: 530 } }
            value={ this.state.setting.description }
          />
        </div>
      </Dialog>
    );
  }
}

SettingDialog.propTypes = {
  rpcInvoke: PropTypes.func,
  snackOnlyAction: PropTypes.func,
};
const NewComponent = AuthConnect(
  SettingDialog,
  null,
  null);

export default NewComponent;
