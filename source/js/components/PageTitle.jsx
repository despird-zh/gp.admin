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
			paddingTop: 20,
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
    	currentPage: null,
    };
  }

  setCurrentPage = (page) => {
  	let state = {currentPage: page};
  	this.setState(state);
  }
	
  render() {

  	return (
		  <div style={this.styles.root}>
		  	<div style={this.styles.container}>
			  	<h3 style={{marginTop: 10 , flex: 1}}> title for 3 <small>what the fuck </small></h3>
	  			<div>
	  				<IconButton 
	  					iconStyle={this.state.currentPage !== 'profile' ? this.styles.btnIconStyle : null}
	  					disabled={this.state.currentPage === 'profile'}>
				      <ActionLaptop />
				    </IconButton>
				    <IconButton 
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