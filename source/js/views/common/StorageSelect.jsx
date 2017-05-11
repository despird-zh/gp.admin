import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

import { GPSelectField } from '../component/GPComponents';
import { AppApis } from '../../store/actions/appActions';

class StorageSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = { storages: []};
  }
  componentWillMount() {
    let { rpcInvoke } = this.props; 
    rpcInvoke(AppApis.StoragesQuery, { type: 'ALL', state: 'ALL' }, (json)=>{
      this.setState({ storages: json });
    });
  }
  render(){

    let { style, rpcInvoke, ...rest } = this.props; // eslint-disable-line

    const storageItems = this.state.storages.map((item) => {
      const { 'storage-id': sid, name } = item;
      return <MenuItem key={ sid } value={ sid } primaryText={ name } />;
    });

    return (
      <GPSelectField
        style={ style }
        {...rest} >
        { storageItems }
      </GPSelectField>
    );
  }
}

StorageSelect.propTypes = {
  style: PropTypes.object,
  rpcInvoke: PropTypes.func.isRequired,
};

export default StorageSelect;