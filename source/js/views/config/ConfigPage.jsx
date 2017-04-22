import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionShop from 'material-ui/svg-icons/action/shop';
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

const pages = {
	profile: {
		path: '/config/profile',
		title: 'System Profile',
		icon: <ActionShop/>,
    description: 'Review the information of System',
    disabled: false
	},
	settings: {
		path: '/config/setting',
    title: 'System Settings',
    icon: <ActionSettings/>,
    description: 'Review the settings of System',
    disabled: false
	},
};

class ConfigPage extends React.Component {

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
  	  	currentPage = pages[key];
  	  }else{
  	  	pages[key].disabled = false;
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

  		return <IconButton key={item.path}
	  					onTouchTap={this.handleTouchJump.bind(this, item)}
	  					iconStyle={ !item.disabled ? this.styles.btnIconStyle : this.styles.activeBtnIconStyle}
	  					disabled={ item.disabled }>
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
		  	{this.props.children && React.cloneElement(this.props.children, {
           setCurrentPage: this.setCurrentPage,
           muiTheme: this.props.muiTheme
         })}
  		</div>
  	);
  }
}


export default muiThemeable()(ConfigPage);