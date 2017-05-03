import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AuthConnect from '../../components/AuthConnect';
import { GPTextField, GPSelectField } from '../../components/GPComponents';
import AvatarEditDialog from '../../components/ImageEditor/AvatarEditDialog';
import { saveAddUser, SecurityApis } from '../../store/actions/securityActions';
import { storagesSaveAction, AppApis } from '../../store/actions/appActions';

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

class UserInfoPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errtips: {},
      avatar: 'assets/img/book2.jpg',
    };
  }

  componentWillMount() {
    this.props.rpcInvoke(AppApis.StoragesQuery, { type: 'ALL', state: 'ALL' }, storagesSaveAction);
    if (this.props.setCurrentPage) { this.props.setCurrentPage('useradd'); }
  }

  onAvatarSave = (img) => {
    const newState = Object.assign({}, this.state, { avatar: img });
    this.setState(newState);
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  handleAvatarOpen = () => {
    this.editor.show();
  }

  handleSave = () => {
    const { useradd } = this.props;
    let postdata = useradd.get('user').toJS();
    postdata['image-path'] = this.state.avatar;
    this.props.rpcInvoke(SecurityApis.UserAdd, postdata, (json) => {
      const { meta, data } = json;

      if (meta.state === 'fail' && meta.code === 'invalid') {
        this.setState({ errtips: data });
      }
      this.props.snackOnlyAction({ show: true, snackTip: json.meta.message });
    }, false, true);
  }

  handleReset = () => {
    let reset = {
      account: '', email:'', 'image-path': '', language:'',
      mobile:'', name:'', password:'', confirm:'', phone:'', pricapacity:'',
      pubcapacity:'', signature:'', sourceId:'', 'source-name': '', state:'',
      'storage-id': '', 'storage-name': '', timezone:'', type:'' 
    };
    this.props.saveAddUser(reset);
    this.setState({ avatar: 'assets/img/book2.jpg' });
  }

  handleFieldChange = (key, event, newVal, payload) => {
    const selects = ['state', 'type', 'language', 'timezone', 'storage-id'];
    const data = {};
    if (selects.indexOf(key) >= 0) {
      data[key] = payload;
    } else {
      data[key] = newVal;
    }
    this.props.saveAddUser(data);
  };

  render() {
    const styles = getStyles(this.props.muiTheme);
    /* eslint-disable */
    const {
      account, email, 'image-path': imagePath, language,
      mobile, name, password, confirm, phone, pricapacity,
      pubcapacity, signature, sourceId, 'source-name': sourceName, state,
      'storage-id': storageId, 'storage-name': storageName, timezone, type
    } = this.props.useradd.get('user').toJS();
    /* eslint-enable */

    const storageItems = this.props.storages.map((item) => {
      const { 'storage-id': sid, sname } = item.toJS();
      return <MenuItem key={ sid } value={ sid } primaryText={ sname } />;
    });

    return (
      <div>
        <div style={ styles.root }>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Reset' style={ { margin: 4 } } onTouchTap={ this.handleReset } />
            <RaisedButton label='Save' style={ { margin: 4 } } primary={ true } onTouchTap={ this.handleSave } />
          </div>
        </div>
        <div style={ styles.container }>
          <div style={ styles.left }>
            <h3 style={ styles.panelTitle }>Base Information</h3>
            <Divider />
            <div style={ styles.container }>
              <GPTextField
                style={ styles.inputItem }
                hintText='16 letters'
                floatingLabelText='Account'
                errorText={ this.state.errtips.account }
                value={ account }
                eventKey='account'
                onHandleChange={ this.handleFieldChange }
              />
              <GPTextField
                style={ styles.inputItem }
                hintText='no more than 32 letters'
                errorText={ this.state.errtips['full-name'] }
                value={ name }
                eventKey='name'
                onHandleChange={ this.handleFieldChange }
                floatingLabelText='Name'
              />
            </div>
            <div style={ styles.container }>
              <GPTextField
                style={ styles.inputItem }
                hintText='1-6 a-z A-Z'
                value={ password }
                eventKey='password'
                onHandleChange={ this.handleFieldChange }
                floatingLabelText='Password'
              />
              <GPTextField
                style={ styles.inputItem }
                hintText='Confirm'
                value={ confirm }
                eventKey='confirm'
                onHandleChange={ this.handleFieldChange }
                floatingLabelText='Confirm'
              />
            </div>
            <div style={ styles.container }>
              <GPSelectField
                style={ styles.inputItem }
                floatingLabelText='Status'
                errorText={ this.state.errtips.status }
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
                errorText={ this.state.errtips.type }
                value={ type }
                eventKey='type'
                onHandleChange={ this.handleFieldChange }
              >
                <MenuItem value={ 'INLINE' } primaryText='InLine' />
                <MenuItem value={ 'LDAP' } primaryText='LDAP' />
                <MenuItem value={ 'OAuth2' } primaryText='OAuth2' />
              </GPSelectField>
            </div>
            <div style={ styles.container }>
              <GPTextField
                style={ styles.inputItem }
                hintText='eg. foo@bar.com'
                floatingLabelText='Email'
                errorText={ this.state.errtips.email }
                value={ email }
                eventKey='email'
                onHandleChange={ this.handleFieldChange }
              />
            </div>
            <div style={ styles.container }>
              <GPTextField
                style={ styles.inputItem }
                hintText='The 11 digits number'
                floatingLabelText='Mobile Number'
                value={ mobile }
                eventKey='mobile'
                onHandleChange={ this.handleFieldChange }
              />
              <GPTextField
                style={ styles.inputItem }
                hintText='Phone'
                floatingLabelText='Phone'
                value={ phone }
                eventKey='phone'
                onHandleChange={ this.handleFieldChange }
              />
            </div>
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
            <div style={ styles.container }>
              <GPTextField
                style={ styles.inputItem }
                hintText='mega bytes unit'
                floatingLabelText='Public cabinet size'
                value={ pubcapacity }
                eventKey='pubcapacity'
                onHandleChange={ this.handleFieldChange }
              />
              <GPTextField
                style={ styles.inputItem }
                hintText='mega bytes unit'
                floatingLabelText='Private cabinet size'
                value={ pricapacity }
                eventKey='pricapacity'
                onHandleChange={ this.handleFieldChange }
              />
            </div>
            <div style={ styles.container }>
              <GPSelectField
                style={ styles.inputItem }
                floatingLabelText='Storage'
                value={ storageId }
                eventKey='storage-id'
                onHandleChange={ this.handleFieldChange }
              >
                { storageItems }
              </GPSelectField>
              <GPSelectField
                style={ styles.inputItem }
                floatingLabelText='Language'
                value={ language }
                eventKey='language'
                onHandleChange={ this.handleFieldChange }
              >
                <MenuItem value={ 'en_US' } primaryText='English' />
                <MenuItem value={ 'zh_CN' } primaryText='Chinese' />
              </GPSelectField>
            </div>
            <div style={ styles.container }>
              <GPSelectField
                style={ styles.inputItem }
                floatingLabelText='Timezone'
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
      </div>
    );
  }
}

UserInfoPage.propTypes = {
  setCurrentPage: PropTypes.func,
  saveAddUser: PropTypes.func,
  rpcInvoke: PropTypes.func,
  useradd: PropTypes.object,
  snackOnlyAction: PropTypes.func,
  muiTheme: PropTypes.object,
  storages: PropTypes.object,
};
const NewComponent = AuthConnect(
  UserInfoPage,
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages'),
  }),
  { saveAddUser });

export default NewComponent;
