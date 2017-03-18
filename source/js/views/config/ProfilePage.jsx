import React from 'react';
import Divider from 'material-ui/Divider';


export default class ProfilePage extends React.Component {

	constructor(props, context) {
    super(props, context);
    
  }

  componentDidMount(){
    this.props.setCurrentPage('profile');
  }
  
  render() {
  	return (
		  <div>
		  	<div>
		  	ddddd profile
  			</div>
  		</div>
  	);
  }
}