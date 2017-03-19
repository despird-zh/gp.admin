import React from 'react';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import AuthConnect from '../../components/AuthConnect';
import { testAction } from '../../store/actions/devActions';

const styles = {
  root: {
    display: 'flex', 
    position: 'relative',
    marginTop: 10
  },
  spacer: { flex: 1 }
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
  }
  
  handleTouchTap = () => {

  	let auth = this.props.isAuthenticated();
  	console.log('auth result:' + auth);
    this.props.testAction();
  }

  render() {

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

export default AuthConnect(
  ProfilePage, 
  (state) => ({
            counter: state.dev.get('counter'),
          }), 
  {testAction});