import React from 'react';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SocialGrp from 'material-ui/svg-icons/social/group';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import SocialGrpAdd from 'material-ui/svg-icons/social/group-add';
import SocialPsnAdd from 'material-ui/svg-icons/social/person-add';
import muiThemeable from 'material-ui/styles/muiThemeable';

function getStyles (muiTheme) {
	const { baseTheme: { spacing, palette } } = muiTheme;
	return{
	  container: {
	  	display: 'flex',
	  	marginTop: spacing.desktopGutterMini,
	  },
	  left: {
	  	marginRight: spacing.desktopGutter,
	  	flexBasis: '33%'
	  },
	  center: {
	  	marginRight: spacing.desktopGutter,
	  	flexBasis: '34%'
	  },
	  right: {
	  	flexBasis: '33%'
	  },
	  panelTitle: {
	  	color: palette.secondaryTextColor,
	  	fontSize: 16, 
	  	marginBottom: 5
	  },
	  inputItem: {
	  	width: 320,
	  	marginLeft: spacing.desktopGutterMini,
	  	marginRight: spacing.desktopGutterMini
	  },
	  avatarCard : {
		  height: 70,
		  width: 70,
		  marginTop: 20,
		  marginRight: 20,
		  marginLeft: 10,
		  marginBottom: 10,
		  textAlign: 'center',
		  display: 'inline-block',
		},
		iconBtnStyle: {
    	float: 'right', 
      width: 28,
      height: 28,
      padding: 2,
      marginRight: 16
		},
		activeBtnIconStyle: {
      fill: palette.disabledColor,
      color: palette.disabledColor,
    },
    btnIconStyle: {
      fill: palette.primary2Color,
      color: palette.primary2Color,
    },
	};
}

const SelectableList = makeSelectable(List);

class WGroupMemberInfo extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
    	errtips: {},
    	current: 'info',
    	group: 1,
    	member: 2,
    	infomode:'grp-add', // grp-add, grp-edit, mbr-add, mbr-edit
    	groupinfo: {},
    	memberinfo: {},
    };
  }

  handleGroupChange = (evt, group) => {
  	let newState = Object.assign({}, this.state, {group, infomode:'grp-edit'});
  	this.setState( newState );
  }

  handleMemberChange = (evt, member) => {
  	let newState = Object.assign({}, this.state, {member, infomode:'mbr-edit'});
  	this.setState( newState );
  }

  handleMemberAdd = () => {
  	let newState = Object.assign({}, this.state, {infomode:'mbr-add'});
  	this.setState( newState );
  }

  handleGroupAdd = () => {
  	let newState = Object.assign({}, this.state, {infomode:'grp-add'});
  	this.setState( newState );
  }

  handleMemberRemove = (evt) => {
  	console.log('handleMemberRemove')
  }

  handleMemberDelete = (evt) => {
  	console.log('handleMemberDelete')
  }

	handleGroupDelete = (evt) => {
  	console.log('handleGroupDelete')
  }

	render() {
		let { group, member, infomode } = this.state;
		let styles = getStyles(this.props.muiTheme);
		return (
			<div style={styles.container}>
	       <div style={styles.left}>
	       	<h3 style={ styles.panelTitle }>Groups </h3>
	       	<Divider/>
	       	<SelectableList 
	       		value={ group }
	       		onChange={this.handleGroupChange}>
	       		<ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton onTouchTap={ this.handleGroupDelete }><ContentClear /></IconButton>}
			        primaryText="All"
			        secondaryText="33"
			        value={1}
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton onTouchTap={ this.handleGroupDelete }><ContentClear /></IconButton>}
			        primaryText="Photos"
			        secondaryText="33"
			        value={2}
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton onTouchTap={ this.handleGroupDelete }><ContentClear /></IconButton>}
			        primaryText="Recipes"
			        secondaryText="2"
			        value={3}
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton onTouchTap={ this.handleGroupDelete }><ContentClear /></IconButton>}
			        primaryText="Work"
			        secondaryText="1"
			        value={4}
			      />
			    </SelectableList>
	       </div>
					<div style={styles.center}>
	       	<h3 style={ styles.panelTitle }>Members</h3>
	       	<Divider/>
	       	<SelectableList
	       		value={ member }
	       		onChange={this.handleMemberChange}>
			      <ListItem
			        primaryText="Brendan Lim"
			        leftAvatar={<Avatar src="assets/img/ok-128.jpg" />}
			        rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear /></IconButton>}
			        value={1}
			      />
			      <ListItem
			        primaryText="Eric Hoffman"
			        leftAvatar={<Avatar src="assets/img/kolage-128.jpg" />}
			        rightIconButton={<IconButton onTouchTap={ this.handleMemberRemove }><ContentRemove /></IconButton>}
			        value={2}
			      />
			      <ListItem
			        primaryText="Grace Ng - 永东科技"
			        leftAvatar={<Avatar src="assets/img/uxceo-128.jpg" />}
			        rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear /></IconButton>}
			        value={3}
			      />
			      <ListItem
			        primaryText="Kerem Suer"
			        leftAvatar={<Avatar src="assets/img/kerem-128.jpg" />}
			        rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear /></IconButton>}
			        value={4}
			      />
			      <ListItem
			        primaryText="Raquel Parrado"
			        leftAvatar={<Avatar src="assets/img/raquelromanp-128.jpg" />}
			        rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear /></IconButton>}
			        value={5}
			      />
			    </SelectableList>
	       </div>
	       <div style={styles.right}>
	       	<h3 style={styles.panelTitle }>Detail Information 
	       		<IconButton 
	       			style={styles.iconBtnStyle} 
	       			iconStyle={ infomode == 'grp-add' ? styles.activeBtnIconStyle : styles.btnIconStyle } 
	       			disabled={ infomode == 'grp-add' }
	       			onTouchTap={ this.handleGroupAdd }>
	       			<SocialGrpAdd/>
	       		</IconButton>
	       		<IconButton 
	       			style={styles.iconBtnStyle} 
	       			iconStyle={ infomode == 'mbr-add' ? styles.activeBtnIconStyle : styles.btnIconStyle } 
	       			disabled={ infomode == 'mbr-add' }
	       			onTouchTap={ this.handleMemberAdd }>
	       			<SocialPsnAdd/>
	       		</IconButton>
	       	</h3>
	       	<Divider/>
	       	{ infomode == 'grp-add' ? 
	       		<GroupInfo
		       	 styles={styles}
		       	 onHandleClear={()=>{}}
		       	 onHandleSave={()=>{}}
		       	/> : null
		      }
		      { infomode == 'mbr-add' ? 
		       	<MemberInfo
		       	 styles={styles}
		       	 onHandleClear={()=>{}}
		       	 onHandleSave={()=>{}}
		       	/> : null
		       }
		       { infomode == 'mbr-edit' ? 
		       	<MemberInfo
		       	 styles={styles}
		       	 onHandleClear={()=>{}}
		       	 onHandleSave={()=>{}}
		       	/> : null
		       }
		       { infomode == 'grp-edit' ? 
		       	<GroupInfo
		       	 styles={styles}
		       	 onHandleClear={()=>{}}
		       	 onHandleSave={()=>{}}
		       	/> : null
		       }
	       </div>
	      </div>
		);
	}
}

const GroupInfo = ({ styles, onHandleClear, onHandleSave, ...props }) => {
	return (
		<div>
	   	<TextField
	   		style= {styles.inputItem}
	      hintText="16 letters"
	      floatingLabelText="Group"
	    />
	    <TextField
	    	style={ styles.inputItem }
	      hintText="no more than 32 letters"
	      type="textarea"
	      floatingLabelText="Description"
	    />
	    <div style={{marginTop: 10}}>
	        <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={ onHandleClear }/>
	        <RaisedButton label="Save" style={{margin: 4, float: 'right'}} primary={true} onTouchTap ={ onHandleSave }/>
	    </div>
		</div>
	);
}

const MemberInfo = ({ styles, onHandleClear, onHandleSave, ...props }) => {
	return (
	<div>
   	<SelectField
      floatingLabelText="Group"
      value={1}
      style= {styles.inputItem}
    >
      <MenuItem value={1} primaryText="Auto width" />
      <MenuItem value={2} primaryText="Every Night" />
      <MenuItem value={3} primaryText="Weeknights" />
      <MenuItem value={4} primaryText="Weekends" />
      <MenuItem value={5} primaryText="Weekly" />
    </SelectField>
   	<TextField
   		style= {styles.inputItem}
      hintText="16 letters"
      floatingLabelText="Account"
    />
    <TextField
    	style={ styles.inputItem }
      hintText="no more than 32 letters"
      floatingLabelText="Group Name"
    />
    <SelectField
      floatingLabelText="Role"
      value={1}
      style= {styles.inputItem}
    >
      <MenuItem value={1} primaryText="Manager" />
      <MenuItem value={2} primaryText="Member" />
    </SelectField>
    <SelectField
      floatingLabelText="Classification"
      value={4}
      style= {styles.inputItem}
    >
      <MenuItem value={1} primaryText="Top Secret" />
      <MenuItem value={2} primaryText="Secret" />
      <MenuItem value={3} primaryText="Credential" />
      <MenuItem value={4} primaryText="Unclassified" />
    </SelectField>
    <div style={{marginTop: 10}}>
        <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={ onHandleClear }/>
        <RaisedButton label="Save" style={{margin: 4, float: 'right'}} primary={true} onTouchTap ={ onHandleSave }/>
    </div>
	</div>
	);
}
export default muiThemeable()(WGroupMemberInfo);
