import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { saveAddUser, SecurityApis } from '../../store/actions/securityActions';
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
    this.state = {
    	errtips: {}
    };
  }

  componentWillMount() {
  	let user_id = this.props.params.userId;
  	this.props.rpcInvoke(AppApis.StoragesQuery, {type:'ALL', state:'ALL'}, storagesSaveAction);
	  if(this.props.setCurrentPage)
  		this.props.setCurrentPage('useradd');
  }
  
  handleFieldChange = (key, event, newVal, payload) => {

    let selects = ['state', 'type', 'language', 'timezone','storageId'];
    let data = {};
    if(selects.indexOf(key) >= 0){
    	data[key] = payload;
    }else{
	    data[key] = newVal;
	  }
    this.props.saveAddUser(data);
  };

  handleRefresh = () => {
  	console.log('wr');
  }

  handleSave = () => {
  	let { useradd } = this.props;
  	let postdata = useradd.get('user').toJS();

  	this.props.rpcInvoke(SecurityApis.UserAdd, postdata, (json)=>{
  		let { meta, data} = json;

  		if(meta.state == 'fail' && meta.code == 'invalid'){
  			let vitem, validmsg = {};
  			for(vitem of data){
  				validmsg[vitem.property.toLowerCase()] = vitem.message;
  			}
  			this.setState({errtips: validmsg});
  		}
  		this.props.snackOnlyAction({show:true, snackTip: json.meta.message});
  	}, false, true);
  }

  render() {
 
  	let styles = getStyles(this.props.muiTheme);
  	let {
			account, createDate, email, imagePath,	language,
			mobile,	name,	password, confirm,	phone,	pricapacity,
			pubcapacity,	signature,	sourceId,	sourceName,	state,
			storageId,	storageName,	timezone,	type, modifier, lastModified
  	} = this.props.useradd.get('user').toJS();

  	let storageItems = this.props.storages.map((item, index) => {
  		let obj = item.toJS();
  		return <MenuItem key={obj.storageId} value={obj.storageId} primaryText={obj.name} />
  	});

  	return (
		  <div>
		  	<div style={styles.root}>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" style={{margin: 4}} primary={true} onTouchTap ={this.handleSave}/>
          </div>
        </div>
        <div style={styles.container}>
	       <div style={styles.left}>
	       	<h3 style={ styles.panelTitle }>Base Information</h3>
	       	<Divider/>
	       	<div style={styles.container}>
		       	<TextField
		       		style= {styles.inputItem}
				      hintText="16 letters"
				      floatingLabelText="Account"
				      errorText={ this.state.errtips.account }
				      value={ account }
				      onChange={ this.handleFieldChange.bind(null, 'account') }
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips.fullname }
				      value={ name }
				      onChange={ this.handleFieldChange.bind(null, 'name') }
				      floatingLabelText="Name"
				    />
			    </div>
			    <div style={styles.container}>
				    <TextField
				    	style={ styles.inputItem }
				      hintText="1-6 a-z A-Z"
				      value={ password }
				      onChange={ this.handleFieldChange.bind(null, 'password') }
				      floatingLabelText="Password"
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="Confirm"
				      value={ confirm }
				      onChange={ this.handleFieldChange.bind(null, 'confirm') }
				      floatingLabelText="Confirm"
				    />
			    </div>
			    <div style={styles.container}>
				    <SelectField
				     style={ styles.inputItem }
		          floatingLabelText="Status"
		          errorText={ this.state.errtips.status }
		          value={ state }
		          onChange={this.handleFieldChange.bind(null, 'state')}>
		          <MenuItem value={'ACTIVE'} primaryText="Active" />
		          <MenuItem value={'DEACTIVE'} primaryText="Deactive" />
		          <MenuItem value={'FROZEN'} primaryText="Frozen" />
		        </SelectField>
		        <SelectField
				     style={ styles.inputItem }
		          floatingLabelText="Type"
		          errorText={ this.state.errtips.type }
		          value={ type }
		          onChange={this.handleFieldChange.bind(null, 'type')}>
		          <MenuItem value={'INLINE'} primaryText="InLine" />
		          <MenuItem value={'LDAP'} primaryText="LDAP" />
		          <MenuItem value={'OAuth2'} primaryText="OAuth2" />
		        </SelectField>
	        </div>
	        <div style={styles.container}>
				    <TextField
				    style={ styles.inputItem }
				      hintText="eg. foo@bar.com"
				      floatingLabelText="Email"
				      errorText={ this.state.errtips.email }
				      value={ email }
				      onChange={ this.handleFieldChange.bind(null, 'email') }
				    />
			    </div>
			    <div style={styles.container}>
				    <TextField
				    style={ styles.inputItem }
				      hintText="The 11 digits number"
				      floatingLabelText="Mobile Number"
				      value={ mobile }
				      onChange={ this.handleFieldChange.bind(null, 'mobile') }
				    />
				    <TextField
				    style={ styles.inputItem }
				      hintText="Phone"
				      floatingLabelText="Phone"
				      value={ phone }
				      onChange={ this.handleFieldChange.bind(null, 'phone') }
				    />
			    </div>
	       </div>
	       <div style={styles.right}>
	       	<h3 style={styles.panelTitle }>Storage Information</h3>
	       	<Divider/>
	       	<div style={styles.container}>
		       	<TextField
		       	style={ styles.inputItem }
				      hintText="mega bytes unit"
				      floatingLabelText="Public cabinet size"
				      value={ pubcapacity }
				      onChange={ this.handleFieldChange.bind(null, 'pubcapacity') }
				    />
				    <TextField
				    style={ styles.inputItem }
				      hintText="mega bytes unit"
				      floatingLabelText="Private cabinet size"
				      value={ pricapacity }
				      onChange={ this.handleFieldChange.bind(null, 'pricapacity') }
				    />
			    </div>
			    <div style={styles.container}>
				    <SelectField
				     style={ styles.inputItem }
		          floatingLabelText="Storage"
		          value={ storageId }
				      onChange={ this.handleFieldChange.bind(null, 'storageId') }>
		          { storageItems }
		        </SelectField>
				    <SelectField
				     style={ styles.inputItem }
		          floatingLabelText="Language"
		          value={ language }
		          onChange={this.handleFieldChange.bind(null, 'language')}
			        >
		          <MenuItem value={'en_US'} primaryText="English" />
		          <MenuItem value={'zh_CN'} primaryText="Chinese" />
		        </SelectField>
	        </div>
	        <div style={styles.container}>
				    <SelectField
				     style={ styles.inputItem }
		          floatingLabelText="Timezone"
		          value={ timezone }
		          onChange={this.handleFieldChange.bind(null, 'timezone')}
			        >
		          <MenuItem value={'GMT+08:00'} primaryText="China Shanghai" />
		          <MenuItem value={'GMT+09:00'} primaryText="Singapore" />
		        </SelectField>
	        </div>
	       </div>
	      </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  UserInfoPage, 
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages')
   }), 
  { saveAddUser });

export default muiThemeable()(NewComponent);