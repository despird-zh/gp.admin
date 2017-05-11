import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

import { AppApis } from '../../store/actions/appActions';

class OrgHierAutoComplete extends React.Component {

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

    if (this.handleFieldChange) { this.handleFieldChange(null, value); }

    rpcInvoke(
      AppApis.OrgNodesQuery,
      { 'org-id': -99 },
      (json) => {
        console.log(json);
        const entries = json.map((item) => ({ text: item.title, value: item.id, id: item.id }));
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
        searchText={ this.state.searchText }
        dataSource={ this.state.dataSource }
        onNewRequest={ this.handleNewRequest }
        onUpdateInput={ this.handleUpdateInput }
        filter={ (search, key) => (key.indexOf(search) !== -1 || search === '@') }
        { ...rest }
      />
    );
  }
}

OrgHierAutoComplete.propTypes = {
  style: PropTypes.object,
  rpcInvoke: PropTypes.func,
  searchText: PropTypes.string,
  eventKey: PropTypes.string,
  onHandleChange: PropTypes.func,
};

export default OrgHierAutoComplete;
