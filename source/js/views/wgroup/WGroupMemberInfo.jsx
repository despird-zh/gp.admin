import React from 'react';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SocialGrp from 'material-ui/svg-icons/social/group';
import ContentClear from 'material-ui/svg-icons/content/clear';
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
	};
}
function addGroup (){
	alert('sssss');
};

class WGroupMemberInfo extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
    	errtips: {}
    };
  }

	render() {
		let styles = getStyles(this.props.muiTheme);
		return (
			<div style={styles.container}>
	       <div style={styles.left}>
	       	<h3 style={ styles.panelTitle }>Groups </h3>
	       	<Divider/>
	       	<List>
	       		<ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			        primaryText="All"
			        secondaryText="33"
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			        primaryText="Photos"
			        secondaryText="33"
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			        primaryText="Recipes"
			        secondaryText="2"
			      />
			      <ListItem
			        leftAvatar={<Avatar icon={<SocialGrp />} />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			        primaryText="Work"
			        secondaryText="1"
			      />
			    </List>
	       </div>
					<div style={styles.center}>
	       	<h3 style={ styles.panelTitle }>Members</h3>
	       	<Divider/>
	       	<List>
			      <ListItem
			        primaryText="Brendan Lim"
			        leftAvatar={<Avatar src="assets/img/ok-128.jpg" />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			      />
			      <ListItem
			        primaryText="Eric Hoffman"
			        leftAvatar={<Avatar src="assets/img/kolage-128.jpg" />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			      />
			      <ListItem
			        primaryText="Grace Ng"
			        leftAvatar={<Avatar src="assets/img/uxceo-128.jpg" />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			      />
			      <ListItem
			        primaryText="Kerem Suer"
			        leftAvatar={<Avatar src="assets/img/kerem-128.jpg" />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			      />
			      <ListItem
			        primaryText="Raquel Parrado"
			        leftAvatar={<Avatar src="assets/img/raquelromanp-128.jpg" />}
			        rightIconButton={<IconButton ><ContentClear /></IconButton>}
			      />
			    </List>
	       </div>
	       <div style={styles.right}>
	       	<h3 style={styles.panelTitle }>Member Information 
	       		<SocialGrpAdd style={{float: 'right', cursor: 'pointer', marginRight: 16}} onClick={addGroup}/>
	       		<SocialPsnAdd style={{float: 'right', cursor: 'pointer', marginRight: 16}} onClick={addGroup}/>
	       	</h3>
	       	<Divider/>
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
              <RaisedButton label="Clear" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" style={{margin: 4, float: 'right'}} primary={true} onTouchTap ={this.handleSave}/>
          </div>
	       </div>
	      </div>
		);
	}
}

export default muiThemeable()(WGroupMemberInfo);
