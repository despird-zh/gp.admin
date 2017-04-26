import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { hashHistory } from 'react-router';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import AuthConnect from '../../components/AuthConnect';
import { saveDicts,
  saveDictsFilter,
  clearDictsFilter,
  MasterApis } from '../../store/actions/masterActions';
import DictDialog from './DictDialog';

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
    checkbox: {
      width: 100,
      marginTop: 10,
    } };
};

class DictListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFilterSearch = this.handleFilter.bind(null, 'search');
    this.onFilterGroup = this.handleFilter.bind(null, 'group');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('dictlist'); }
  }

  setDictDialog = (dialog) => {
    this.dictDialog = dialog;
  }

  handleJump = (userId) => {
    const url = `/security/useredit/${ userId }`;
    hashHistory.push(url);
  }

  handleQuery = () => {
    const { search, group } = this.props.dictlist;
    const params = { search, group };

    this.props.rpcInvoke(MasterApis.DictsQuery, params, saveDicts);
  }

  handleClear = () => {
    const filter = {
      search: '',
      group: '',
    };

    this.props.clearDictsFilter(filter);
  }

  handleFilter = (key, event, newVal) => {
    const filter = {};
    if (key === 'search') {
      filter[key] = event.target.value;
    } else {
      filter[key] = newVal;
    }

    this.props.saveDictsFilter(filter);
  }

  render() {
    const { entries, group, search } = this.props.dictlist.toJS();

    const styles = getStyles(this.props.muiTheme);

    const rows = entries.map((item) => {
      return (<DictListRow
        rowData={ item }
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
            style={ styles.search }
            floatingLabelText='Entry Group'
            value={ group }
            onChange={ this.onFilterGroup }
          >
            <MenuItem value={ 'web_excp' } primaryText='Web Exception' />
            <MenuItem value={ 'core_excp' } primaryText='Core Exception' />
            <MenuItem value={ 'core_mesg' } primaryText='Core Message' />
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
        <DictDialog
          ref={ this.setDictDialog }
          rpcInvoke={ this.props.rpcInvoke }
          muiTheme={ this.props.muiTheme }
        />
      </div>
    );
  }
}

DictListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
  dictlist: PropTypes.object,
  saveDictsFilter: PropTypes.func,
  clearDictsFilter: PropTypes.func,
  rpcInvoke: PropTypes.func,
};

/*eslint-disable */
const DictListRow = ({rowData, onHandleJump}) => {

  const { 'entry-id':entryId, 'entry-key':entryKey, 
          'group-key':groupKey, 'entry-value':entryValue, label, language } = rowData;

  const handleJump = () => { onHandleJump(entryKey); };

  return (<TableRow key={ account }>
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
  DictListPage,
  (state) => ({
    dictlist: state.master.get('dictlist'),
  }),
  { saveDictsFilter, clearDictsFilter });

export default NewComponent;
