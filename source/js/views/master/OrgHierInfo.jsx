import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UserAutoComplete from '../common/UserAutoComplete';
import OrgHierAutoComplete from '../common/OrgHierAutoComplete';

import { GPTextField, GPSelectField } from '../component/GPComponents';

const getStyles = function (muiTheme) {
  const { baseTheme: { spacing } } = muiTheme;
  return {
    inputItem: {
      width: 320,
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini,
    },
  };
};

class OrgHierInfo extends React.Component {

  render() {
    const { 
      onHandleClear, 
      onHandleSave, 
      onHandleChange,
      muiTheme, 
      rpcInvoke, 
      initialData,
      infomode 
     } = this.props;
    const styles = getStyles(muiTheme);
    const { title, admin, manager, email, description } = initialData; 
    return (
      <div>
        {(infomode === 'org-add') && <OrgHierAutoComplete
          style={ styles.inputItem }
          rpcInvoke={ rpcInvoke }
          hintText='Input Name Letter'
          openOnFocus={ true }
          floatingLabelText='Parent Organization Node'
          eventKey="parent"
          onHandleChange={ onHandleChange }
        />}
        <GPTextField
          eventKey="text"
          style={ styles.inputItem }
          hintText='no more than 32 letters'
          floatingLabelText='Org. Node Name'
          value = {title}
          eventKey="title"
          onHandleChange={ onHandleChange }
        />
        <UserAutoComplete
          style={ styles.inputItem }
          rpcInvoke={ rpcInvoke }
          hintText='Assign a user as administrator'
          floatingLabelText='Administrator'
          eventKey="admin"
          searchText = {admin}
          onHandleChange={ onHandleChange }
        />
        <UserAutoComplete
          style={ styles.inputItem }
          rpcInvoke={ rpcInvoke }
          hintText='Assign a manager to org node'
          floatingLabelText='Manager'
          eventKey="manager"
          searchText={ manager }
          onHandleChange={ onHandleChange }
        />
        <GPTextField
          style={ styles.inputItem }
          hintText='no more than 32 letters'
          floatingLabelText='Contact Mail'
          eventKey="email"
          value= {email}
          onHandleChange={ onHandleChange }
        />
        <GPTextField
          style={ styles.inputItem }
          hintText='no more than 32 letters'
          floatingLabelText='Description'
          eventKey="description"
          value = {description}
          onHandleChange={ onHandleChange }
        />
        <div style={ { marginTop: 10 } }>
          {(infomode === 'org-add') && <RaisedButton label='Clear' style={{ margin: 4 }} onTouchTap={ this.handleClear } />}
          <RaisedButton label='Save' style={ { margin: 4, float: 'right' } } primary={ true } onTouchTap={ onHandleSave } />
        </div>
      </div>
    );
  }

}

OrgHierInfo.propTypes = {
  onHandleClear: PropTypes.func,
  onHandleChange: PropTypes.func,
  onHandleSave: PropTypes.func,
  muiTheme: PropTypes.object,
  rpcInvoke: PropTypes.func,
};

class OrgHierMember extends React.Component {

  setMemberRef = (comp) => {
    this.memberRef = comp;
  }

  handleClear = () => {
    this.memberRef.setSearchText('');
  }

  handleSave = () => {
    console.log(this.memberRef.getSearchText());
  }
  render() {
    const { muiTheme, rpcInvoke } = this.props;
    const styles = getStyles(muiTheme);

    return (
      <div>
        <UserAutoComplete
          ref={ this.setMemberRef }
          style={ styles.inputItem }
          rpcInvoke={ rpcInvoke }
          hintText='find user'
          floatingLabelText='Add User as Member'
        />
        <div style={{ marginTop: 10 } }>
          <RaisedButton label='Clear' style={ { margin: 4 } } onTouchTap={ this.handleClear } />
          <RaisedButton label='Save' style={ { margin: 4, float: 'right' } } primary={ true } onTouchTap={ this.handleSave } />
        </div>
      </div>
    );
  }
}

OrgHierMember.propTypes = {
  onMemberAdd: PropTypes.func,
  muiTheme: PropTypes.object,
  rpcInvoke: PropTypes.func,
};

export { OrgHierInfo, OrgHierMember };
