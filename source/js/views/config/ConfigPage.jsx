import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionLaptop from 'material-ui/svg-icons/hardware/laptop';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import typography from 'material-ui/styles/typography';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';

function getStyles(muiTheme) {

	const {baseTheme} = muiTheme;

	return {
		root: {
			width: '100%',
		},
		container: {
			paddingTop: 10,
			width: '100%',
			display: 'flex',
			color: baseTheme.palette.textColor,
		},
		activeBtnIconStyle: {
      fill: baseTheme.palette.accent2Color,
      color: baseTheme.palette.accent2Color,
    },
    btnIconStyle: {
      fill: baseTheme.palette.primary2Color,
      color: baseTheme.palette.primary2Color,
    },
	};
};

class ConfigPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.styles = getStyles(this.props.muiTheme);
    this.state = {
    	title: null,
    	description: null,
    	currentPage: null,
    };
  }

  setCurrentPage = ({page, title, description}) => {
  	let state = {
  		currentPage: page,
  		title, description
  	};
  	this.setState(state);
  }
	
	handleTouchJump = (path) => {
		this.props.router.push(path);
	}

  render() {

  	return (
		  <div style={this.styles.root}>
		  	<div style={this.styles.container}>
			  	<h3 style={{marginTop: 10 , flex: 1}}> {this.state.title} <small>{this.state.description} </small></h3>
	  			<div>
	  				<IconButton 
	  					onTouchTap={this.handleTouchJump.bind(this, '/config/profile')}
	  					iconStyle={this.state.currentPage !== 'profile' ? this.styles.btnIconStyle : null}
	  					disabled={this.state.currentPage === 'profile'}>
				      <ActionLaptop />
				    </IconButton>
				    <IconButton 
				    	onTouchTap={this.handleTouchJump.bind(this, '/config/setting')}
				   	  iconStyle={this.state.currentPage !== 'setting' ? this.styles.btnIconStyle : null}
				    	disabled={this.state.currentPage === 'setting'}>
				      <ActionSettings />
				    </IconButton>
	  			</div>
  			</div>
  			<Divider/>
		  	{this.props.children && React.cloneElement(this.props.children, {
            setCurrentPage: this.setCurrentPage
        })}
  		</div>
  	);
  }
}

export default muiThemeable()(ConfigPage);