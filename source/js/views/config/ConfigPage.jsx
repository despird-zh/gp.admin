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

const pages = [
	{
		path: '/config/profile',
		title: 'System Profile',
		icon: <ActionLaptop />,
    description: 'Review the information of System'
	},
	{
		path: '/config/setting',
    title: 'System Settings',
    icon: <ActionSettings />,
    description: 'Review the settings of System'
	},
];

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

	handleTouchJump = (path) => {
		this.props.router.push(path);
	}

  render() {
  	let currentPath = this.props.location.pathname;
  	let buttons = pages.map((item) => {

  		return <IconButton key={item.path}
	  					onTouchTap={this.handleTouchJump.bind(this, item.path)}
	  					iconStyle={currentPath !== item.path ? this.styles.btnIconStyle : null}
	  					disabled={currentPath === item.path}>
				      {item.icon}
				    </IconButton>;
  	});

  	return (
		  <div style={this.styles.root}>
		  	<div style={this.styles.container}>
			  	<h3 style={{marginTop: 10 , flex: 1}}> {this.state.title} <small>{this.state.description} </small></h3>
	  			<div>
	  				{buttons}
	  			</div>
  			</div>
  			<Divider/>
		  	{this.props.children}
  		</div>
  	);
  }
}

export default muiThemeable()(ConfigPage);