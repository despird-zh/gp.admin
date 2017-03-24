import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { profileSaveAction } from '../../store/actions/configActions';
import API from '../../rpcapi';

const styles = {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
}

class ProfilePage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  
  handleTouchTap = () => {

  	console.log('auth result:' + this.props.authenticated);
    this.props.testAction();
  }

  handleRefresh = () => {
    this.props.rpcInvoke(API.configService.queryProfile, {}, (response) => {
      console.log('----------------------');
      this.props.profileSaveAction(response.data);
    });
  };
  
  render() {

    let profile = this.props.profile;
    const gutter = this.props.muiTheme.spacing.desktopGutter;
    const  input = {
      marginRight: gutter
    }

  	return (
		  <div>
        <div style={styles.root}>
          <Chip
            style={{margin: 6}}>
            {this.props.profile.get('lastModified')} Modified By {profile.get('modifier')}
          </Chip>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" primary={true} style={{margin: 4}} />
          </div>
        </div>
        <div>
          <TextField style={ input }
            defaultValue="Default Value"
            floatingLabelText="Entity code"
            value={ profile.get('entityCode')}
            floatingLabelFixed={true}/>
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Node code"
            value={ profile.get('nodeCode')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Short Name"
            value={ profile.get('shortName')}
            floatingLabelFixed={true}/>
          <TextField style={ Object.assign({},input,{width:100}) }
            hintText="Hint Text"
            floatingLabelText="Abbreviation"
            value={ profile.get('abbr')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Entity Name"
            value={ profile.get('name')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Administrator"
            value={ profile.get('admin')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Service URL"
            value={ profile.get('serviceUrl')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Binary URL"
            value={ profile.get('binaryUrl')}
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter})}
            hintText="Hint Text"
            value={ profile.get('description')}
            floatingLabelText="Description"
            floatingLabelFixed={true}/>
        </div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  ProfilePage, 
  (state) => ({
            profile: state.config.get('profile'),
          }), 
  {profileSaveAction});

export default muiThemeable()(NewComponent);
