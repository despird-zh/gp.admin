import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import SocialPerson from 'material-ui/svg-icons/social/person';
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

const pages = {
	userlist: {
		path: '/security/userlist',
		title: 'Internal Users',
		icon: <SocialPeople/>,
    description: 'The internal users list',
    visible: true,
    disabled: false
	},
	useradd: {
		path: '/security/useradd',
		title: 'Add User',
		icon: <SocialPersonAdd /> ,
    description: 'Add new user information',
    visible: true,
    disabled: false,
	},
	useredit: {
		path: '/security/userinfo/',
		title: 'Internal Users',
		icon: <SocialPerson/> ,
    description: 'The internal users list',
    visible: true,
    disabled: false,
	}
};

class SecurityPage extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.styles = getStyles(this.props.muiTheme);
    this.state = {
    	pages: [],
    	currentPage: {},
    };
  }

  setCurrentPage = (pageName) => {
  	let currentPage = null, key;

  	for( key of Object.keys(pages) ){
  	  if( pageName == key){
  	  	pages[key].disabled = true;
  	  	pages[key].visible = true;
  	  	currentPage = pages[key];
  	  }else{
  	  	pages[key].disabled = false;
  	  	pages[key].visible = true;
  	  }

  		if( pageName != 'useredit'){
  			pages['useredit'].visible = false;
  		}
  	}
  	
  	let state = { pages: Object.values(pages), currentPage };
  	this.setState(state);
  }

	handleTouchJump = (pathinfo) => {
		this.props.router.push(pathinfo.path);
	}

  render() {
  	let { currentPage, pages } = this.state;
  	let buttons = pages.map((item) => {

  		return item.visible? <IconButton key={item.path}
	  					onTouchTap={this.handleTouchJump.bind(this, item)}
	  					iconStyle={ !item.disabled ? this.styles.btnIconStyle : this.activeBtnIconStyle}
	  					disabled={ item.disabled }>
				      {item.icon}
				    </IconButton> : null;
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
		  	{this.props.children && React.cloneElement(this.props.children, {
           setCurrentPage: this.setCurrentPage
         })}
  		</div>
  	);
  }
}

export default muiThemeable()(SecurityPage);

