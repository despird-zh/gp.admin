import React from 'react';
import PropTypes from 'prop-types';
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

  setInnerRef = (refComponent) => {
    this.autoComplete = refComponent;
  };

  setSearchText = (searchText) => {
    this.setState({ searchText });
    this.autoComplete.setState({ searchText });
  }

  getSearchText = () => {
    return this.state.searchText;
  }

  handleUpdateInput = (value) => {
    const { rpcInvoke } = this.props;

    this.setState({ searchText: value });

    rpcInvoke(
      AppApis.UsersQuery,
      { user_name: value, instanceId: null },
      (json) => {
        const entries = json.map((item) => ({ text: item.name, value: item.account, id: item['user-id'] }));
        this.setState({
          dataSource: entries,
        });
      }
    );
  };

  handleNewRequest = (chosenRequest, index) => {
    this.setState({ searchText: chosenRequest, newReqIndex: index });
  };

  render() {
    const { style, rpcInvoke, searchText, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (

      <AutoComplete
        ref={ this.setInnerRef }
        textFieldStyle={ style }
        searchText={ this.state.searchText }
        dataSource={ this.state.dataSource }
        onNewRequest={ this.handleNewRequest }
        onUpdateInput={ this.handleUpdateInput }
        { ...rest }
      />
    );
  }
}

UserAutoComplete.propTypes = {
  style: PropTypes.object,
  rpcInvoke: PropTypes.func,
  searchText: PropTypes.string,
};

export default UserAutoComplete;
