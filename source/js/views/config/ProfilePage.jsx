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

  handleSave = () => {
    let postdata = this.props.profile.toJS();
  	this.props.rpcInvoke(ConfigApis.EntProfileSave, postdata, 
    (json)=>{
      this.props.snackOnlyAction({show:true, snackTip: json.meta.message});
    }, 
    false, 
    true);
  }

  handleFieldChange = (key, event, newVal, payload) => {

    let data = {};
    data[key] = newVal;
    
    this.props.profileSaveAction(data);
  };

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
              <RaisedButton label="Save" primary={true} style={{margin: 4}} onTouchTap ={this.handleSave} />
          </div>
        </div>
        <div>
          <div style={styles.container}>
            <TextField style={ input }
              floatingLabelText="Entity code"
              onChange={ this.handleFieldChange.bind(null, 'entity-code') }
              value={ entityCode }/>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Node code"
              onChange={ this.handleFieldChange.bind(null, 'node-code') }
              value={ nodeCode }/>
          </div>
          <div style={styles.container}>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Short Name"
              onChange={ this.handleFieldChange.bind(null, 'short-name') }
              value={ shortName }/>
            <TextField style={ Object.assign({},input,{width:100}) }
              hintText="Hint Text"
              floatingLabelText="Abbreviation"
              onChange={ this.handleFieldChange.bind(null, 'abbr') }
              value={ abbr }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Entity Name"
               onChange={ this.handleFieldChange.bind(null, 'name') }
              value={ name }/>
          </div>
          <div style={styles.container}>
            <TextField style={ input }
              hintText="Hint Text"
              floatingLabelText="Administrator"
               onChange={ this.handleFieldChange.bind(null, 'admin') }
              value={ admin }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Service URL"
               onChange={ this.handleFieldChange.bind(null, 'service-url') }
              value={ serviceUrl }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
              hintText="Hint Text"
              floatingLabelText="Binary URL"
               onChange={ this.handleFieldChange.bind(null, 'binary-url') }
              value={ binaryUrl }/>
          </div>
          <div style={styles.container}>
            <TextField style={ Object.assign({}, input,{ width: 512 + gutter})}
              hintText="Hint Text"
              value={ description }
               onChange={ this.handleFieldChange.bind(null, 'description') }
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
  {profileSaveAction});

export default muiThemeable()(NewComponent);
