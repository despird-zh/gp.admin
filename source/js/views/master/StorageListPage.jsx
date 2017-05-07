import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import AuthConnect from '../../components/AuthConnect';
import { saveStorages,
  MasterApis } from '../../store/actions/masterActions';
import StorageDialog from './StorageDialog';

const getStyles = function (muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    spacer: { flex: 1 },
    iconStyle: {
      height: 20,
    },
    search: {
      marginRight: baseTheme.spacing.desktopGutterLess,
    },
    select: {
      width: 150,
      marginRight: baseTheme.spacing.desktopGutterLess,
    } };
};

class StorageListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFilterSearch = this.handleFilter.bind(null, 'search');
    this.onFilterType = this.handleFilter.bind(null, 'type');
    this.onFilterState = this.handleFilter.bind(null, 'state');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('storagelist'); }
  }

  setStorageDialog = (dialog) => {
    this.storageDialog = dialog;
  }

  handleJump = (storageId) => {
    const storages = this.props.storagelist.get('storages');
    const idx = storages.findIndex((item) => {
      return item['storage-id'] === storageId;
    });
    const storage = storages[idx];
    this.storageDialog.handleOpen(storage);
  }

  handleQuery = () => {
    const { 'search':filter, type, state } = this.props.mapJson(
      this.props.storagelist,[
        'search', 'type', 'state'
      ]);
    const params = { filter, type, state };

    this.props.rpcInvoke(MasterApis.StoragesQuery, params, (json) => {

      return saveStorages({ storages: json});
    });
  }

  handleClear = () => {
    const filter = {
      search: '',
      type: '',
      state: '',
      storages: [],
    };

    this.props.saveStorages( filter );
  }

  handleFilter = (key, event, newVal, payload) => {
    const filter = {};
    const selects = ['type','state'];

    if (selects.indexOf(key) >= 0) {
      filter[key] = payload;
    } else {
      filter[key] = newVal;
    }
    this.props.saveStorages(filter);
  }

  render() {
    const { storages, search, type, state } = this.props.mapJson(
      this.props.storagelist, [
      'storages', 'search', 'type', 'state'
      ]);

    const styles = getStyles(this.props.muiTheme);

    const rows = storages.map((item) => {
      return (<StorageListRow
        key={ `row_${ item['storage-id'] }` }
        rowData={ item }
        styles={ styles }
        onHandleJump={ this.handleJump }
      />);
    });

    return (
      <div>
        <div style={ styles.root }>
          <TextField
            style={ styles.search }
            value={ search }
            onChange={ this.onFilterSearch }
            hintText='Search'
          />
          <SelectField
            style={ styles.select }
            value={ type }
            hintText='Persist Type'
            onChange={ this.onFilterType }
          >
            <MenuItem value={ 'DISK' } primaryText='Disk' />
            <MenuItem value={ 'HDFS' } primaryText='HDFS' />
            <MenuItem value={ 'ALL' } primaryText='All' />
          </SelectField>
          <SelectField
            style={ styles.select }
            value={ state }
            hintText='The State'
            onChange={ this.onFilterState }
          >
            <MenuItem value={ 'OPEN' } primaryText='Open' />
            <MenuItem value={ 'CLOSE' } primaryText='Close' />
            <MenuItem value={ 'FULL' } primaryText='Full' />
            <MenuItem value={ 'ALL' } primaryText='All' />
          </SelectField>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Clear' style={ { margin: 4 } } onTouchTap={ this.handleClear } />
            <RaisedButton label='Query' style={ { margin: 4 } } onTouchTap={ this.handleQuery } />
          </div>
        </div>
        <Table>
          <TableHeader
            displaySelectAll={ false }
            adjustForCheckbox={ false }
            enableSelectAll={ false }
          >
            <TableRow>
              <TableHeaderColumn>Group</TableHeaderColumn>
              <TableHeaderColumn>Entry</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
              <TableHeaderColumn>Language</TableHeaderColumn>
              <TableHeaderColumn>Label</TableHeaderColumn>
              <TableHeaderColumn style={ { width: 80 } }>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            {rows}
          </TableBody>
        </Table>
        <StorageDialog
          ref={ this.setDictDialog }
          rpcInvoke={ this.props.rpcInvoke }
          muiTheme={ this.props.muiTheme }
        />
      </div>
    );
  }
}

StorageListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
  storagelist: PropTypes.object,
  saveStorages: PropTypes.func,
  rpcInvoke: PropTypes.func,
};

/*eslint-disable */
const StorageListRow = ({styles, rowData, onHandleJump}) => {

  const { 'entry-id':entryId, 'entry-key':entryKey, 
          'group-key':groupKey, 'entry-value':entryValue, label, language } = rowData;

  const handleJump = () => { onHandleJump( entryId ); };

  return (<TableRow key={ entryId }>
    <TableRowColumn>{groupKey}</TableRowColumn>
    <TableRowColumn> {entryKey}</TableRowColumn>
    <TableRowColumn>{entryValue }</TableRowColumn>
    <TableRowColumn>{language}</TableRowColumn>
    <TableRowColumn>{label}</TableRowColumn>
    <TableRowColumn style={ { width: 80 } }>
      <IconButton iconStyle={ styles.iconStyle } onClick={ handleJump }><ModeEditIcon /></IconButton >
    </TableRowColumn>
  </TableRow>);
};
/*eslint-enable */

const NewComponent = AuthConnect(
  StorageListPage,
  (state) => ({
    storagelist: state.master.get('storagelist'),
  }),
  { saveStorages });

export default NewComponent;
