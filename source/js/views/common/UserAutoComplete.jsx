import React from 'react';
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete';

import { AppApis } from '../../store/actions/appActions';

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
    let { rpcInvoke } = this.props;
    rpcInvoke(
      AppApis.UsersQuery, 
      {user_name: value, instanceId: null}, 
      (json)=>{
        let entries = json.map((item) => ({ text: item.name, value: item.account, id: item['user-id']}));
        this.setState({
          dataSource: entries
        });
      }
    );
  };

  handleNewRequest = (chosenRequest, index) => {
    this.setState({newReqIndex: index});
  };

  render(){

  	let {style, hintText, floatingLabelText} = this.props;
    console.log(style)
  	return (

  		<AutoComplete ref="autoComplete"
	      textFieldStyle={ style }
	      searchText={this.state.searchText}
	      dataSource={this.state.dataSource}
	      onNewRequest={this.handleNewRequest}
        onUpdateInput={this.handleUpdateInput}
	      hintText={hintText}
	      floatingLabelText={floatingLabelText}
	    />
  	);
  }
}

UserAutoComplete.propTypes = {
  rpcInvoke: PropTypes.func,
  onChange: PropTypes.func,
  searchText:PropTypes.string
};

export default UserAutoComplete;