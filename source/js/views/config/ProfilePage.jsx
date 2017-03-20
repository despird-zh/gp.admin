import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AuthConnect from '../../components/AuthConnect';
import { testAction } from '../../store/actions/devActions';

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

  componentDidMount(){

    this.props.setCurrentPage({
      page: 'profile',
      title: 'System Profile',
      description: 'Review the information of System'
    });
    console.log(this.props.muiTheme);
  }
  
  handleTouchTap = () => {

  	let auth = this.props.isAuthenticated();
  	console.log('auth result:' + auth);
    this.props.testAction();
  }

  render() {
    const gutter = this.props.muiTheme.spacing.desktopGutter;
    const  input = {
      marginRight: gutter
    }

  	return (
		  <div>
        <div style={styles.root}>
          <Chip
            style={{margin: 6}}>
            Text Chipssssssssssss
          </Chip>
          <div style={styles.spacer} />
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} />
              <RaisedButton label="Save" primary={true} style={{margin: 4}} />
          </div>
        </div>
        <div>
          <TextField style={ input }
            defaultValue="Default Value"
            floatingLabelText="Entity code"
            floatingLabelFixed={true}/>
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Node code"
            floatingLabelFixed={true}/><br/>
          
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Short Name"
            floatingLabelFixed={true}/>
          <TextField style={ Object.assign({},input,{width:100}) }
            hintText="Hint Text"
            floatingLabelText="Abbreviation"
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Entity Name"
            floatingLabelFixed={true}/><br/>
          <TextField style={ input }
            hintText="Hint Text"
            floatingLabelText="Administrator"
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Service URL"
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter}) }
            hintText="Hint Text"
            floatingLabelText="Binary URL"
            floatingLabelFixed={true}/><br/>
          <TextField style={ Object.assign({}, input,{ width: 512 + gutter})}
            hintText="Hint Text"
            floatingLabelText="Description"
            floatingLabelFixed={true}/>
        </div>
		  	<div>
		  	ddddd profile counter of dev - {this.props.counter}
		  	<RaisedButton label="Primary" primary={true} 
		  	onTouchTap ={this.handleTouchTap}/>
  			</div>
  		</div>
  	);
  }
}

const NewComponent = AuthConnect(
  ProfilePage, 
  (state) => ({
            counter: state.dev.get('counter'),
          }), 
  {testAction});

export default muiThemeable()(NewComponent);
