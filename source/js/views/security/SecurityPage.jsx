import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import SocialPeople from 'material-ui/svg-icons/social/people';
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
		path: '/security/userlist',
		title: 'Internal Users',
		icon: <SocialPeople />,
    description: 'The internal users list'
	},
	{
		path: '/security/userinfo/_blank_',
		title: 'Add User',
		icon: <SocialPersonAdd />,
    description: 'Add new user information'
	},
];

class SecurityPage extends React.Component {

	constructor(props, context) {
    super(props, context);

    this.styles = getStyles(this.props.muiTheme);

  }

  getPageInfo = (path) => {
  	for( let i = 0; i < pages.length; i++){
  		if(path === pages[i].path)
  			return pages[i];
  	}
  	return pages[0];
  }

	handleTouchJump = (path) => {
		this.props.router.push(path);
	}

	componentWillMount() {
		
	}

  render() {
  	let path = this.props.location.pathname;
    let currentPage = this.getPageInfo(path);
  	let buttons = pages.map((item) => {

  		return <IconButton key={item.path}
	  					onTouchTap={this.handleTouchJump.bind(this, item.path)}
	  					iconStyle={currentPage.path != item.path ? this.styles.btnIconStyle : null}
	  					disabled={currentPage.path == item.path}>
				      {item.icon}
				    </IconButton>;
  	});

  	return (
		  <div style={this.styles.root}>
		  	<div style={this.styles.container}>
			  	<h3 style={{marginTop: 10 , flex: 1}}> { currentPage.title } <small>{ currentPage.description } </small></h3>
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


export default muiThemeable()(SecurityPage);