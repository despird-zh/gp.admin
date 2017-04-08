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

const pages = {
	wgroupadd:{
		path: '/wgroup/wgroupadd/',
		title: 'Workgroup Add',
		icon: <ActionLaptop />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
	},
	wgroupedit:{
		path: '/wgroup/wgroupedit/',
		title: 'Workgroup Edit',
		icon: <ActionLaptop />,
    description: 'Review the information of System',
    visible: true,
    disabled: false,
	},
	wgrouplist:{
		path: '/wgroup/wgrouplist',
    title: 'Workgroup List',
    icon: <ActionSettings />,
    description: 'Review the settings of System',
    visible: true,
    disabled: false,
	},
};

class WGroupPage extends React.Component {

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


export default muiThemeable()(WGroupPage);