import React from 'react';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import AvatarEditDialog from '../../components/ImageEditor/AvatarEditDialog'
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
	  	flexBasis: '50%'
	  },
	  right: {
	  	flexBasis: '50%'
	  },
	  panelTitle: {
	  	color: palette.secondaryTextColor,
	  	fontSize: 16, 
	  	marginBottom: 5
	  },
	  inputItem: {
	  	width: 240,
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

const WGroupBaseInfo = ({ errtips, onChange, baseinfo, setEditorRef, onAvatarSave, onAvatarOpen, ...props }) => {
	let styles = getStyles(props.muiTheme);
	return (
		<div style={styles.container}>
       <div style={styles.left}>
       	<h3 style={ styles.panelTitle }>Base Information</h3>
       	<Divider/>
       	<div style={styles.container}>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="16 letters"
			      floatingLabelText="Account"
			      errorText={ errtips.account }
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="Group Name"
			    />
		    </div>
		    <div style={styles.container}>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="16 letters"
			      floatingLabelText="Manager"
			      errorText={ errtips.account }
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="Administrator"
			    />
		    </div>
		    <div style={styles.container}>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="16 letters"
			      floatingLabelText="Organization"
			      errorText={ errtips.account }
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="State"
			    />
		    </div>
		    <div style={styles.container}>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="16 letters"
			      floatingLabelText="Description"
			      errorText={ errtips.account }
			    />
			    
		    </div>
		   	<div style={{display:'flex', flexDirection: 'row'}}>
	       	<Checkbox
			      label="Topic1"
			      style={{width:'30%',marginTop: 38}}
			    />
			    <Checkbox
			      label="Share"
			      style={{width:'30%',marginTop: 38}}
			    />
			    <Checkbox
			      label="Link"
			      style={{width:'30%',marginTop: 38}}
			    />
		    </div>
       </div>

       <div style={styles.right}>
       	<h3 style={styles.panelTitle }>Avatar Information</h3>
       	<Divider/>
       	<div style={{display: 'flex'}}>
       		<Paper style={styles.avatarCard} zDepth={1}>
       			<img
	            src='assets/img/book2.jpg'
	            style={{ width:70,height:70,}}
	          />
       		</Paper>
       		<div style={{display: 'flex', flexDirection: 'column-reverse', width: 100}}>
       			<RaisedButton label="Change" style={{marginBottom: 10}} onTouchTap ={onAvatarOpen}/>
       		</div>
       		<AvatarEditDialog ref={setEditorRef} onSave={onAvatarSave}/>
       	</div>
       	<h3 style={styles.panelTitle }>Storage Information</h3>
       	<Divider/>
       	<div style={styles.container}>
	       	<TextField
	       		style= {styles.inputItem}
			      hintText="16 letters"
			      floatingLabelText="Storage"
			      errorText={ errtips.account }
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="State"
			    />
		    </div>
		    <div style={styles.container}>
		    	<Toggle
			      label="Public Cabinet"
			      style={{width:'50%', marginTop: 40, paddingRight: 40, paddingLeft: 10}}
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="capacity"
			    />
		    </div>
		    <div style={styles.container}>
	       	<Toggle
			      label="Private Cabinet"
			      style={{width:'50%', marginTop: 40, paddingRight: 40, paddingLeft: 10}}
			    />
			    <TextField
			    	style={ styles.inputItem }
			      hintText="no more than 32 letters"
			      errorText={ errtips['full-name'] }
			      floatingLabelText="capacity"
			    />
		    </div>
       </div>
      </div>
	);
};

export default muiThemeable()(WGroupBaseInfo);