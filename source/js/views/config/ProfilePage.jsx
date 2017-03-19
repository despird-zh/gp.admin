import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import HOC from '../../components/AuthRpcSupport';
import { testAction } from '../../store/actions/devActions';

class ProfilePage extends React.Component {

	constructor(props, context) {
    super(props, context);
    
  }

  componentDidMount(){
    this.props.setCurrentPage('profile');
  }
  
  handleTouchTap(){
    console.log(this.props);
  	let auth = this.props.isAuthenticated();
  	console.log(auth);
    this.props.testAction();
  }

  render() {
  	return (
		  <div>
		  	<div>
		  	ddddd profile
		  	<RaisedButton label="Primary" primary={true} 
		  	onTouchTap ={this.handleTouchTap.bind(this)}/>
  			</div>
  		</div>
  	);
  }
}

export default HOC(ProfilePage, {testAction});