import React from 'react';
import Divider from 'material-ui/Divider';
import typography from 'material-ui/styles/typography';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';

const styles = {
	root: {
		width: '100%',
	},
	container: {
		paddingTop: 20,
		width: '100%',
		color: typography.textLightBlack,
    fontWeight: typography.fontWeightLight,
	}
};

export default class ConfigPage extends React.Component {

	constructor(props, context) {
    super(props, context);
  }

  render() {
  	console.log(this.props);
  	return (
		  <div style={styles.root}>
		  	<div style={styles.container}>
			  	<h3 style={{marginBottom: 10}}> title for 3 <small>what the fuck </small></h3>
	  			
  			</div>
  			<Divider/>
		  	{this.props.children}
  		</div>
  	);
  }
}