import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { profileSaveAction, SecurityApis } from '../../store/actions/securityActions';
import { storagesSaveAction, AppApis } from '../../store/actions/appActions';
function getStyles (muiTheme) {
	const {baseTheme} = muiTheme;
	return{
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
  container: {
  	display: 'flex'
  },
  left: {
  	marginRight: baseTheme.spacing.desktopGutter,
  	flexBasis: '50%'
  },
  right: {
  	flexBasis: '50%'
  },
  panelTitle: {
  	color: baseTheme.palette.textColor,
  	fontSize: 16, 
  	marginBottom: 5
  },
  inputItem: {
  	width: 240,
  	marginLeft: baseTheme.spacing.desktopGutterMini,
  	marginRight: baseTheme.spacing.desktopGutterMini
  }
};
}

class UserInfoPage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  
  componentWillMount() {
  	this.props.rpcInvoke(AppApis.StoragesQuery, {type:'ALL', state:'ALL'}, storagesSaveAction);
  }

  render() {
 
  	let styles = getStyles(this.props.muiTheme);
  	let {
			account,
			avatarId,
			classification,
			createDate,
			email,
			extraInfo,
			fullName,
			globalAccount,
			id,
			infoId,
			language,
			lastLogonDate,
			mobile,
			modifier,
			modifyDate,
			netdiskCabinet,
			password,
			phone,
			publishCabinet,
			retryTimes,
			signature,
			sourceAbbr,
			sourceId,
			sourceName,
			sourceShortName,
			state,
			storageId,
			storageName,
			timeZone,
			type
  	} = this.props.userinfo.toJS();

  	let storageItems = this.props.storages.map((item, index) => {
  		let obj = item.toJS();
  		return <MenuItem value={obj.storageId} primaryText={obj.name} />
  	});
  	return (
		  <div>
		  	<div style={styles.root}>
          
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" style={{margin: 4}} primary={true} onTouchTap ={this.handleRefresh}/>
          </div>
        </div>
        <div style={styles.container}>
	       <div style={styles.left}>
	       	<h3 style={ styles.panelTitle }>Base Information</h3>
	       	<Divider/>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="Account"
			      floatingLabelText="Fixed Floating Label Text"
			      value={account}
			      floatingLabelFixed={true}
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="Name"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="Password"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="Confirm"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			     <SelectField
			     style={ styles.inputItem }
	          floatingLabelText="Status"
	          floatingLabelFixed={true}
	          onChange={this.handleChange}
		        >
	          <MenuItem value={1} primaryText="Action" />
	          <MenuItem value={2} primaryText="Deactive" />
	          <MenuItem value={3} primaryText="Frozen" />
	        </SelectField>
	        <SelectField
			     style={ styles.inputItem }
	          floatingLabelText="Type"
	          floatingLabelFixed={true}
	          onChange={this.handleChange}
		        >
	          <MenuItem value={1} primaryText="LDAP" />
	          <MenuItem value={2} primaryText="OAuth2" />
	        </SelectField>
			    <TextField
			    style={ styles.inputItem }
			      hintText="Email"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    /><br/>
			    <TextField
			    style={ styles.inputItem }
			      hintText="Mobile"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			    <TextField
			    style={ styles.inputItem }
			      hintText="Phone"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
	       </div>
	       <div style={styles.right}>
	       	<h3 style={styles.panelTitle }>Storage Information</h3>
	       	<Divider/>
	       	<TextField
	       	style={ styles.inputItem }
			      hintText="Public Cab"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			    <TextField
			    style={ styles.inputItem }
			      hintText="Private Cab"
			      floatingLabelText="Fixed Floating Label Text"
			      floatingLabelFixed={true}
			    />
			    <SelectField
			     style={ styles.inputItem }
	          floatingLabelText="Storage"
	          floatingLabelFixed={true}
	          onChange={this.handleChange}>
	          { storageItems }
	        </SelectField>
	        <div style={{ display: 'inline-block', width: 200 }}/>
			    <SelectField
			     style={ styles.inputItem }
	          floatingLabelText="Language"
	          floatingLabelFixed={true}
	          onChange={this.handleChange}
		        >
	          <MenuItem value={1} primaryText="LDAP" />
	          <MenuItem value={2} primaryText="OAuth2" />
	        </SelectField>
			    <SelectField
			     style={ styles.inputItem }
	          floatingLabelText="Timezone"
	          floatingLabelFixed={true}
	          onChange={this.handleChange}
		        >
	          <MenuItem value={1} primaryText="LDAP" />
	          <MenuItem value={2} primaryText="OAuth2" />
	        </SelectField>
	       </div>
	      </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  UserInfoPage, 
  (state) => ({
    userinfo: state.security.get('userinfo'),
    storages: state.app.get('storages')
   }), 
  {});

export default muiThemeable()(NewComponent);