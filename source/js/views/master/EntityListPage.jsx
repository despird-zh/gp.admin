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
import { saveEntities,
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
    select: {
      width: 200,
      marginRight: baseTheme.spacing.desktopGutterLess,
    } };
};

class EntityListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFilterSearch = this.handleFilter.bind(null, 'search');
    this.onFilterGroup = this.handleFilter.bind(null, 'group');
    this.onFilterLanguage = this.handleFilter.bind(null, 'language');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('entitylist'); }
  }

  setDictDialog = (dialog) => {
    this.dictDialog = dialog;
  }

  handleJump = (sourceId) => {
    const entities = this.props.entitylist.get('entities');
    const idx = entities.findIndex((item) => {
      return item['source-id'] === sourceId;
    });
    const entity = entities[idx];
    this.dictDialog.handleOpen(entity);
  }

  handleQuery = () => {
    const { search, group, language } = this.props.entitylist.toJS();
    const params = { search, group, language };

    this.props.rpcInvoke(MasterApis.EntitiesQuery, params, (json) => { 
      return saveEntities({ entities: json });
    });
  }

  handleClear = () => {
    const filter = {
      search: '',
      group: '',
      language: 'en_us',
      entries: [],
    };

    this.props.saveEntities(filter);
  }

  handleFilter = (key, event, newVal, payload) => {
    const filter = {};
    const selects = ['group', 'language'];

    if (selects.indexOf(key) >= 0) {
      filter[key] = payload;
    } else {
      filter[key] = newVal;
    }
    this.props.saveEntities(filter);
  }

  render() {
    const { entities, group, search, language } = this.props.entitylist.toJS();

    const styles = getStyles(this.props.muiTheme);

    const rows = entities.map((item) => {
      return (<EntityListRow
        key={ `row_${ item['entry-id'] }` }
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
            value={ group }
            hintText='The Entry Group'
            onChange={ this.onFilterGroup }
          >
            <MenuItem value={ 'web_excp' } primaryText='Web Exception' />
            <MenuItem value={ 'core_excp' } primaryText='Core Exception' />
            <MenuItem value={ 'core_mesg' } primaryText='Core Message' />
          </SelectField>
          <SelectField
            style={ styles.select }
            value={ language }
            hintText='The Language'
            onChange={ this.onFilterLanguage }
          >
            <MenuItem value={ 'en_us' } primaryText='English' />
            <MenuItem value={ 'zh_cn' } primaryText='Chinese' />
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

EntityListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
  entitylist: PropTypes.object,
  saveEntities: PropTypes.func,
  rpcInvoke: PropTypes.func,
};

/*eslint-disable */
const EntityListRow = ({styles, rowData, onHandleJump}) => {

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
  EntityListPage,
  (state) => ({
    entitylist: state.master.get('entitylist'),
  }),
  { saveEntities });

export default NewComponent;

