import React from 'react';
import Divider from 'material-ui/Divider';


export default class SettingPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    
  }

  componentDidMount(){
    this.props.setCurrentPage('setting');
  }
  
  render() {
  	return (
		  <div>
		  	<div>
		  	aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  			</div>
  		</div>
  	);
  }
}