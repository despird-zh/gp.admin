import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import AvatarEditDialog from '../../components/ImageEditor/AvatarEditDialog'

import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';

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
		}
	};
}

class WGroupAddPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
    	errtips: {},
      avatar: 'assets/img/book2.jpg'
    };
  }

  componentWillMount() {
	  if(this.props.setCurrentPage)
  		this.props.setCurrentPage('wgroupadd');
  }

  onClickSave = (img) => {
    let newState = Object.assign({}, this.state, {avatar: img});
    this.setState(newState);
  }

  handleOpen = ()=>{
    this.editor.show();
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  render() {
  	let styles = getStyles(this.props.muiTheme);
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
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="Group Name"
				    />
			    </div>
			    <div style={styles.container}>
		       	<TextField
		       		style= {styles.inputItem}
				      hintText="16 letters"
				      floatingLabelText="Manager"
				      errorText={ this.state.errtips.account }
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="Administrator"
				    />
			    </div>
			    <div style={styles.container}>
		       	<TextField
		       		style= {styles.inputItem}
				      hintText="16 letters"
				      floatingLabelText="Organization"
				      errorText={ this.state.errtips.account }
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="State"
				    />
			    </div>
			    <div style={styles.container}>
		       	<TextField
		       		style= {styles.inputItem}
				      hintText="16 letters"
				      floatingLabelText="Description"
				      errorText={ this.state.errtips.account }
				    />
				    
			    </div>
			   	<div style={{display:'flex', flexDirection: 'row'}}>
		       	<Checkbox
				      label="Topic"
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
		            src={this.state.avatar}
		            style={{ width:70,height:70,}}
		          />
	       		</Paper>
	       		<div style={{display: 'flex', flexDirection: 'column-reverse', width: 100}}>
	       			<RaisedButton label="Change" style={{marginBottom: 10}} onTouchTap ={this.handleAvatarOpen}/>
	       		</div>
	       		<AvatarEditDialog ref={this.setEditorRef} onSave={this.onAvatarSave}/>
	       	</div>
	       	<h3 style={styles.panelTitle }>Storage Information</h3>
	       	<Divider/>
	       	<div style={styles.container}>
		       	<TextField
		       		style= {styles.inputItem}
				      hintText="16 letters"
				      floatingLabelText="Storage"
				      errorText={ this.state.errtips.account }
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="State"
				    />
			    </div>
			    <div style={styles.container}>
		       	<Checkbox
				      label="Public Cabinet"
				      style={{width:'50%', marginTop: 40}}
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="capacity"
				    />
			    </div>
			    <div style={styles.container}>
		       	<Checkbox
				      label="Private Cabinet"
				      style={{width:'50%', marginTop: 40}}
				    />
				    <TextField
				    	style={ styles.inputItem }
				      hintText="no more than 32 letters"
				      errorText={ this.state.errtips['full-name'] }
				      floatingLabelText="capacity"
				    />
			    </div>

	       </div>
	      </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  WGroupAddPage, 
  (state) => ({
    useradd: state.security.get('useradd'),
    storages: state.app.get('storages')
   }), 
  null);

export default muiThemeable()(NewComponent);