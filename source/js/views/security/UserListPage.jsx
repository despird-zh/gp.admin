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
import { saveUsers,
  SecurityApis } from '../../store/actions/securityActions';

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
    } };
}

class UserListPage extends React.Component {

  constructor(props) {
    super(props);
    this.onFilterSearch = this.handleFilter.bind(null, 'search');
    this.onFilterInternal = this.handleFilter.bind(null, 'internal');
    this.onFilterExternal = this.handleFilter.bind(null, 'external');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('userlist'); }
  }

  handleJump = (userId) => {
    const url = `/security/useredit/${ userId }`;
    hashHistory.push(url);
  }

  handleQuery = () => {
    const search = this.props.userlist.get('search');
    const params = { filterkey: search, state: 'ALL', type: 'ALL' };
    this.props.rpcInvoke(SecurityApis.UsersQuery, params, (json) => {
      return saveUsers({ users: json });
    });
  }

  handleClear = () => {
    const filter = {
      search: '',
      internal: false,
      external: false,
      users: [],
    };

    this.props.saveUsers(filter);
  }

  handleFilter = (key, event, newVal) => {
    const filter = {};
    if (key === 'search') {
      filter[key] = event.target.value;
    } else {
      filter[key] = newVal;
    }

    this.props.saveUsers(filter);
  }

  render() {
    const { users, internal, external, search } = this.props.mapJson(
      this.props.userlist, [
        'users', 'internal', 'external', 'search',
      ]);

    const styles = getStyles(this.props.muiTheme);

    const rows = users.map((item) => {
      return (<UserListRow rowData={ item } styles={ styles } onHandleJump={ this.handleJump } />);
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
              <TableHeaderColumn>Account/Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Mobile</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Entity</TableHeaderColumn>
              <TableHeaderColumn style={ { width: 80 } }>OP.</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

UserListPage.propTypes = {
  setCurrentPage: PropTypes.func,
  userlist: PropTypes.object,
  rpcInvoke: PropTypes.func,
  saveUsers: PropTypes.func,
  muiTheme: PropTypes.object,
  mapJson: PropTypes.func,
};

/*eslint-disable */
const UserListRow = ({ rowData, styles, onHandleJump }) => {
  const { account, email, name, mobile, state, 'source-name': sourceName, 'user-id': userId } = rowData;

  const handleJump = () => { onHandleJump(userId); };

  return (<TableRow key={ account }>
    <TableRowColumn>{account} - {name}</TableRowColumn>
    <TableRowColumn>{email}</TableRowColumn>
    <TableRowColumn>{mobile}</TableRowColumn>
    <TableRowColumn>{state}</TableRowColumn>
    <TableRowColumn>{sourceName}</TableRowColumn>
    <TableRowColumn style={ { width: 80 } }>
      <IconButton iconStyle={ styles.iconStyle } onClick={ handleJump }><ModeEditIcon /></IconButton >
    </TableRowColumn>
  </TableRow>);
};
/*eslint-enable */

const NewComponent = AuthConnect(
  UserListPage,
  (state) => ({
    userlist: state.security.get('userlist'),
  }),
  { saveUsers });

export default NewComponent;
