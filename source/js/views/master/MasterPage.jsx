import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionLaptop from 'material-ui/svg-icons/hardware/laptop';
import ActionShop from 'material-ui/svg-icons/action/shop';
import ImgPhoto from 'material-ui/svg-icons/image/photo';
import DevStorage from 'material-ui/svg-icons/device/storage';
import AVLibBooks from 'material-ui/svg-icons/av/library-books';
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
	dictlist: {
		path: '/master/dictlist',
		title: 'Dictionary Information',
		icon: <AVLibBooks/>,
    description: 'System dictionary list',
    visible: true,
    disabled: false
	},
	entitylist: {
		path: '/master/entitylist',
    title: 'Entities Information',
    icon: <ActionShop />,
    description: 'System entity list',
    visible: true,
    disabled: false
	},
	imagelist: {
		path: '/master/imagelist',
    title: 'Image Information',
    icon: <ImgPhoto />,
    description: 'System image list',
    visible: true,
    disabled: false
	},
	storagelist: {
		path: '/master/storagelist',
    title: 'Storage Information',
    icon: <DevStorage />,
    description: 'System storage list',
    visible: true,
    disabled: false
	},
};

class MasterPage extends React.Component {

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
	  					tooltip={ item.description }
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


export default muiThemeable()(MasterPage);