import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import AuthConnect from '../../components/AuthConnect';
import { testAction } from '../../store/actions/devActions';

class ProfilePage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){

    this.props.setCurrentPage('profile');
  }
  
  handleTouchTap = () => {

  	let auth = this.props.isAuthenticated();
  	console.log('auth result:' + auth);
    this.props.testAction();
  }

  render() {
  	return (
		  <div>
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