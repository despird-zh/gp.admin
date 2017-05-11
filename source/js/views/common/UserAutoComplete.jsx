import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

import { AppApis } from '../../store/actions/appActions';

class UserAutoComplete extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: [],
    };

    const { onHandleChange, eventKey } = this.props;
    if (onHandleChange && eventKey) { this.handleFieldChange = onHandleChange.bind(null, eventKey); }
  }

  setInnerRef = (refComponent) => {
    this.autoComplete = refComponent;
  };

  setSearchText = (searchText) => {
    this.autoComplete.setState({ searchText });
  }

  getSearchText = () => {
    return this.autoComplete.state.searchText;
  }

  handleUpdateInput = (value) => {
    const { rpcInvoke } = this.props;

    const name = (value) ? value.replace(/@/, '') : value;
    this.setState({ searchText: value, searchValue: value });

    if (this.handleFieldChange) { this.handleFieldChange(null, value); }

    rpcInvoke(
      AppApis.UsersQuery,
      { user_name: name, instanceId: null },
      (json) => {
        const entries = json.map((item) => ({ text: item.account, value: item.account, id: item['user-id'] }));
        this.setState({
          dataSource: entries,
        });
      }
    );
  };

  handleNewRequest = (chosenRequest) => {
    if (this.handleFieldChange) { this.handleFieldChange(null, chosenRequest.value); }
  };

  render() {
    const { style, rpcInvoke, searchText, eventKey, onHandleChange, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (

      <AutoComplete
        ref={ this.setInnerRef }
        textFieldStyle={ style }
        searchText={ searchText }
        dataSource={ this.state.dataSource }
        onNewRequest={ this.handleNewRequest }
        onUpdateInput={ this.handleUpdateInput }
        filter={ (search, key) => (key.indexOf(search) !== -1 || search === '@') }
        { ...rest }
      />
    );
  }
}

UserAutoComplete.propTypes = {
  style: PropTypes.object,
  rpcInvoke: PropTypes.func,
  searchText: PropTypes.string,
  eventKey: PropTypes.string,
  onHandleChange: PropTypes.func,
};

export default UserAutoComplete;
