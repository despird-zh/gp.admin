import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { profileSaveAction,ConfigApis } from '../../store/actions/configActions';

const styles = {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 },
  container: {
    display: 'flex',
  },
}

class ProfilePage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }
  
  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('profile');
    this.props.rpcInvoke(ConfigApis.EntProfileQuery, {},
      profileSaveAction);
  }

  handleTouchTap = () => {

  	console.log('auth result:' + this.props.authenticated);
    this.props.testAction();
  }

  handleRefresh = () => {
    this.props.rpcInvoke(ConfigApis.EntProfileQuery, {},
      profileSaveAction);
  };
  
  render() {

    let profile = this.props.profile;
    const gutter = this.props.muiTheme.spacing.desktopGutter;
    const  input = {
      marginRight: gutter
    }
    let {
      'last-modified': lastModified,
      'modifier': modifier,
      'entity-code': entityCode,
      'node-code': nodeCode,
      'short-name': shortName,
      'abbr': abbr,
      'name': name,
      'admin': admin,
      'service-url': serviceUrl,
      'binary-url': binaryUrl,
      'description': description
    } = this.props.profile.toJS();

  	return (
		  <div>
        <div style={styles.root}>
          <Chip
            style={{margin: 6}}>
            { lastModified } Modified By { modifier }
          </Chip>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
              <RaisedButton label="Save" primary={true} style={{margin: 4}} />
          </div>
        </div>
        <div>
          <div style={styles.container}>
            <TextField style={ input }
              floatingLabelText="Entity code"
              value={ entityCode }/>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Node code"
              value={ nodeCode }/>
          </div>
          <div style={styles.container}>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Short Name"
              value={ shortName }/>
            <TextField style={ Object.assign({},input,{width:100}) }
              hintText="Hint Text"
              floatingLabelText="Abbreviation"
              value={ abbr }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Entity Name"
              value={ name }/>
          </div>
          <div style={styles.container}>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Administrator"
              value={ admin }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Service URL"
              value={ serviceUrl }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Binary URL"
              value={ binaryUrl }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter})}
              hintText="Hint Text"
              value={ description }
              floatingLabelText="Description"/>
          </div>
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
  {});

export default muiThemeable()(NewComponent);
