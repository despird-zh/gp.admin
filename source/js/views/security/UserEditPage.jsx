import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AuthConnect from '../component/AuthConnect';
import { GPTextField, GPSelectField } from '../component/GPComponents';
import AvatarEditDialog from '../component/ImageEditor/AvatarEditDialog';
import { saveUserEdit, SecurityApis } from '../../store/actions/securityActions';

import StorageSelect from '../common/StorageSelect';

function getStyles(muiTheme) {
  const { baseTheme } = muiTheme;
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    spacer: { flex: 1 },
    container: {
      display: 'flex',
    },
    left: {
      marginRight: baseTheme.spacing.desktopGutter,
      flexBasis: '50%',
    },
    right: {
      flexBasis: '50%',
    },
    panelTitle: {
      color: baseTheme.palette.textColor,
      fontSize: 16,
      marginBottom: 5,
    },
    inputItem: {
      width: 240,
      marginLeft: baseTheme.spacing.desktopGutterMini,
      marginRight: baseTheme.spacing.desktopGutterMini,
    },
    avatarCard: {
      height: 70,
      width: 70,
      marginTop: 20,
      marginRight: 20,
      marginLeft: 10,
      marginBottom: 10,
      textAlign: 'center',
      display: 'inline-block',
    },
  };
}

class UserEditPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errtips: {},
      avatar: 'assets/img/book2.jpg',
    };
  }

  componentWillMount() {
    const userId = this.props.params.userId;
    this.props.rpcInvoke(SecurityApis.UserInfo, { 'user_id': userId }, saveUserEdit);
    if (this.props.setCurrentPage) { this.props.setCurrentPage('useredit'); }
  }

  handleFieldChange = (key, event, newVal, payload) => {
    const selects = ['state', 'type', 'language', 'timezone', 'storage-id'];
    const data = {};
    if (selects.indexOf(key) >= 0) {
      data[key] = payload;
    } else {
      data[key] = newVal;
    }
    this.props.saveUserEdit(data);
  };

  handleRefresh = () => {
    console.log('wr');
  }

  handleSave = () => {
    const { useredit } = this.props;
    const postdata = useredit.get('user').toJS();
    this.props.rpcInvoke(SecurityApis.UserSave, postdata,
    (json) => {
      this.props.snackOnlyAction({ show: true, snackTip: json.meta.message });
    },
    false,
    true);
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    /* eslint-disable */
    const {
      account, 'create-date': createDate, email, 'image-path': imagePath, language,
      mobile, name, password, confirm, phone, pricapacity,
      pubcapacity, signature, sourceId, 'source-name': sourceName, state,
      'storage-id': storageId, 'storage-name': storageName, timezone, type, modifier, 'last-modified': lastModified,
    } = this.props.useredit.get('user').toJS();
    /* eslint-enable */

    return (
      <div>
        <div style={ styles.root }>
          <Chip style={ { margin: 6 } }>
            { lastModified } Modified By { modifier }
          </Chip>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Refresh' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
            <RaisedButton label='Save' style={ { margin: 4 } } primary={ true } onTouchTap={ this.handleSave } />
          </div>
        </div>
        <div style={ styles.container }>
          <div style={ styles.left }>
            <h3 style={ styles.panelTitle }>Base Information</h3>
            <Divider />
            <GPTextField
              style={ styles.inputItem }
              hintText='Account'
              floatingLabelText='Fixed Floating Label Text'
              value={ account }
              eventKey='account'
              onHandleChange={ this.handleFieldChange }
              floatingLabelFixed={ true }
            />
            <GPTextField
              style={ styles.inputItem }
              hintText='Name'
              value={ name }
              eventKey='name'
              onHandleChange={ this.handleFieldChange }
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
            />
            <GPTextField
              style={ styles.inputItem }
              hintText='Password'
              value={ password }
              eventKey='password'
              onHandleChange={ this.handleFieldChange }
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
            />
            <GPTextField
              style={ styles.inputItem }
              hintText='Confirm'
              value={ confirm }
              eventKey='confirm'
              onHandleChange={ this.handleFieldChange }
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
            />
            <GPSelectField
              style={ styles.inputItem }
              floatingLabelText='Status'
              floatingLabelFixed={ true }
              value={ state }
              eventKey='state'
              onHandleChange={ this.handleFieldChange }
            >
              <MenuItem value={ 'ACTIVE' } primaryText='Active' />
              <MenuItem value={ 'DEACTIVE' } primaryText='Deactive' />
              <MenuItem value={ 'FROZEN' } primaryText='Frozen' />
            </GPSelectField>
            <GPSelectField
              style={ styles.inputItem }
              floatingLabelText='Type'
              floatingLabelFixed={ true }
              value={ type }
              eventKey='type'
              onHandleChange={ this.handleFieldChange }
            >
              <MenuItem value={ 'INLINE' } primaryText='InLine' />
              <MenuItem value={ 'LDAP' } primaryText='LDAP' />
              <MenuItem value={ 'OAuth2' } primaryText='OAuth2' />
            </GPSelectField>
            <GPTextField
              style={ styles.inputItem }
              hintText='Email'
              floatingLabelText='Fixed Floating Label Text'
              value={ email }
              eventKey='email'
              onHandleChange={ this.handleFieldChange }
              floatingLabelFixed={ true }
            /><br />
            <GPTextField
              style={ styles.inputItem }
              hintText='Mobile'
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
              value={ mobile }
              eventKey='mobile'
              onHandleChange={ this.handleFieldChange }
            />
            <GPTextField
              style={ styles.inputItem }
              hintText='Phone'
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
              value={ phone }
              eventKey='phone'
              onHandleChange={ this.handleFieldChange }
            />
          </div>
          <div style={ styles.right }>
            <h3 style={ styles.panelTitle }>Avatar Information</h3>
            <Divider />
            <div style={ { display: 'flex' } }>
              <Paper style={ styles.avatarCard } zDepth={ 1 }>
                <img
                  role='presentation'
                  src={ this.state.avatar }
                  style={ { width: 70, height: 70 } }
                />
              </Paper>
              <div style={ { display: 'flex', flexDirection: 'column-reverse', width: 100 } }>
                <RaisedButton label='Change' style={ { marginBottom: 10 } } onTouchTap={ this.handleAvatarOpen } />
              </div>
              <AvatarEditDialog ref={ this.setEditorRef } onSave={ this.onAvatarSave } />
            </div>
            <h3 style={ styles.panelTitle }>Storage Information</h3>
            <Divider />
            <GPTextField
              style={ styles.inputItem }
              hintText='Public Cab'
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
              value={ pubcapacity }
              eventKey='pubcapacity'
              onHandleChange={ this.handleFieldChange }
            />
            <GPTextField
              style={ styles.inputItem }
              hintText='Private Cab'
              floatingLabelText='Fixed Floating Label Text'
              floatingLabelFixed={ true }
              value={ pricapacity }
              eventKey='pricapacity'
              onHandleChange={ this.handleFieldChange }
            />
            <StorageSelect
              style={ styles.inputItem }
              floatingLabelText='Storage'
              value={ storageId }
              eventKey='storage-id'
              onHandleChange={ this.handleFieldChange }
              rpcInvoke={ this.props.rpcInvoke }
            />
            <div style={ { display: 'inline-block', width: 200 } } />
            <GPSelectField
              style={ styles.inputItem }
              floatingLabelText='Language'
              floatingLabelFixed={ true }
              value={ language }
              eventKey='language'
              onHandleChange={ this.handleFieldChange }
            >
              <MenuItem value={ 'en_US' } primaryText='English' />
              <MenuItem value={ 'zh_CN' } primaryText='Chinese' />
            </GPSelectField>
            <GPSelectField
              style={ styles.inputItem }
              floatingLabelText='Timezone'
              floatingLabelFixed={ true }
              value={ timezone }
              eventKey='timezone'
              onHandleChange={ this.handleFieldChange }
            >
              <MenuItem value={ 'GMT+08:00' } primaryText='China Shanghai' />
              <MenuItem value={ 'GMT+09:00' } primaryText='Singapore' />
            </GPSelectField>
          </div>
        </div>
      </div>
    );
  }
}
UserEditPage.propTypes = {
  setCurrentPage: PropTypes.func,
  params: PropTypes.object,
  rpcInvoke: PropTypes.func,
  saveUserEdit: PropTypes.func,
  useredit: PropTypes.object,
  snackOnlyAction: PropTypes.func,
  muiTheme: PropTypes.object,
};

const NewComponent = AuthConnect(
  UserEditPage,
  (state) => ({
    useredit: state.security.get('useredit'),
  }),
  { saveUserEdit });

export default NewComponent;
