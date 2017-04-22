import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import AuthConnect from '../../components/AuthConnect';
import { AppApis } from '../../store/actions/appActions';

const getStyles = function(muiTheme){
	const { baseTheme: { spacing, palette } } = muiTheme;
	return {
		inputItem: {
      width: 320,
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini
    }
	};
};

class UserAutoComplete extends React.Component { 

	constructor(props, context) {
    super(props, context);
	  this.state = {
	    dataSource: [],
	    searchText: this.props.searchText,
	    newReqIndex: -1,
	  };
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  handleNewRequest = (chosenRequest, index) => {
    console.log(chosenRequest + ' / ' + index);
    this.setState({newReqIndex: index});
  };

  handlePopoverClose = () => {
  	
  	if(this.state.newReqIndex == -1)
  		this.refs['autoComplete'].setState({searchText: ''});

  	console.log(this.state);
  }

  render(){
  	let {muiTheme, hintText, floatingLabelText} = this.props;
  	let styles = getStyles(muiTheme);

  	return (

  		<AutoComplete ref="autoComplete"
	      style={ styles.inputItem }
	      searchText={this.state.searchText}
	      dataSource={this.state.dataSource}
	      onClose={this.handlePopoverClose}
	      onNewRequest={this.handleNewRequest}
        onUpdateInput={this.handleUpdateInput}
	      hintText={hintText}
	      floatingLabelText={floatingLabelText}
	    />
  	);
  }
}

const NewComponent = AuthConnect(
  UserAutoComplete, 
  null, 
  {});

export default NewComponent;