import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { hashHistory } from 'react-router';

import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import AuthConnect from '../../components/AuthConnect';
import { groupsSave, groupSave, filterSave, searchClear, WorkgroupApis } from '../../store/actions/wgroupActions';


function getStyles(muiTheme) {
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
    },
  };
}

class WGroupListPage extends React.Component {

  constructor(props) {
    super(props);
    this.onFilterSearch = this.handleFilter.bind(null, 'search');
    this.onFilterInternal = this.handleFilter.bind(null, 'internal');
    this.onFilterExternal = this.handleFilter.bind(null, 'external');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('wgrouplist'); }
  }

  handleFilter = (key, event, newVal) => {
    const filter = {};
    if (key === 'search') {
      filter[key] = event.target.value;
    } else {
      filter[key] = newVal;
    }
    this.props.filterSave(filter);
  }

  handleClear = () => {
    const filter = {
      search: '',
      internal: false,
      external: false,
    };

    this.props.searchClear(filter);
  }

  handleJump = (wgroupId) => {
    const url = `/wgroup/wgroupedit/${ wgroupId }`;
    hashHistory.push(url);
  }

  handleQuery = () => {
    const search = this.props.grouplist.search;
    const params = { filterkey: search, state: 'ALL', type: 'ALL' };

    this.props.rpcInvoke(WorkgroupApis.GroupsQuery, params, groupsSave);
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    const { groups, internal, external, search } = this.props.grouplist.toJS();

    const rows = groups.map((item) => {
      return (
        <WGroupListRow rowData={ item } onHandleJump={ this.handleJump } />
      );
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
          <Checkbox
            label='Internal'
            style={ styles.checkbox }
            checked={ internal }
            onCheck={ this.onFilterInternal }
          />
          <Checkbox
            label='External'
            style={ styles.checkbox }
            checked={ external }
            onCheck={ this.onFilterExternal }
          />
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
              <TableHeaderColumn>Wgroup Name</TableHeaderColumn>
              <TableHeaderColumn>Source</TableHeaderColumn>
              <TableHeaderColumn>Admin/Manager</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn style={ { width: 130 } }>Create</TableHeaderColumn>
              <TableHeaderColumn style={ { width: 80 } }>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            { rows }
          </TableBody>
        </Table>
      </div>
    );
  }
}

WGroupListPage.propTypes = {
  setCurrentPage: PropTypes.func,
  filterSave: PropTypes.func,
  grouplist: PropTypes.object,
  muiTheme: PropTypes.object,
  rpcInvoke: PropTypes.func,
  searchClear: PropTypes.func,
};

/*eslint-disable */
const WGroupListRow = ({ rowData, onHandleJump }) => {
  const { 'workgroup-id': wgroupId, 'workgroup-name': wgroupName,
        'source-name': sourceName, admin, manager,
        state, description, 'create-date': createDate } = rowData;

  const handleJump = () => { onHandleJump(wgroupId); };

  return (<TableRow key={ wgroupId }>
    <TableRowColumn>{wgroupName}</TableRowColumn>
    <TableRowColumn>{sourceName}</TableRowColumn>
    <TableRowColumn>{admin} - {manager}</TableRowColumn>
    <TableRowColumn>{state}</TableRowColumn>
    <TableRowColumn>{description}</TableRowColumn>
    <TableRowColumn style={ { width: 130 } }>{createDate}</TableRowColumn>
    <TableRowColumn style={ { width: 80 } }>
      <IconButton iconStyle={ styles.iconStyle } onClick={ handleJump }><ModeEditIcon /></IconButton >
    </TableRowColumn>
  </TableRow>);
};
/*eslint-enable */

const NewComponent = AuthConnect(
  WGroupListPage,
  (state) => ({
    grouplist: state.wgroup.get('grouplist'),
  }),
  { groupsSave, groupSave, filterSave, searchClear });

export default NewComponent;
