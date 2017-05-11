import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { hashHistory } from 'react-router';

import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import AuthConnect from '../component/AuthConnect';
import { saveWGroups, WorkgroupApis } from '../../store/actions/wgroupActions';


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
    this.props.saveWGroups(filter);
  }

  handleClear = () => {
    const filter = {
      search: '',
      internal: false,
      external: false,
      wgroups: [],
    };

    this.props.saveWGroups(filter);
  }

  handleJump = (wgroupId) => {
    const url = `/wgroup/wgroupedit/${ wgroupId }`;
    hashHistory.push(url);
  }

  handleQuery = () => {
    const search = this.props.wgrouplist.get('search');
    const params = { filterkey: search, state: 'ALL', type: 'ALL' };

    this.props.rpcInvoke(WorkgroupApis.GroupsQuery, params, (json) => {
      return saveWGroups({ wgroups: json });
    });
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    const { wgroups, internal, external, search } = this.props.mapJson(
                                                  this.props.wgrouplist,
                                                  ['wgroups', 'internal', 'external', 'search']);

    const rows = wgroups.map((item) => {
      return (
        <WGroupListRow rowData={ item } styles={ styles } onHandleJump={ this.handleJump } />
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
  saveWGroups: PropTypes.func,
  wgrouplist: PropTypes.object,
  muiTheme: PropTypes.object,
  rpcInvoke: PropTypes.func,
  mapJson: PropTypes.func,
};

/*eslint-disable */
const WGroupListRow = ({ rowData, styles, onHandleJump }) => {
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
    wgrouplist: state.wgroup.get('wgrouplist'),
  }),
  { saveWGroups });

export default NewComponent;
