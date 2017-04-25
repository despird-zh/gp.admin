import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import AuthConnect from '../../components/AuthConnect';
import SettingDialog from './SettingDialog';

import { settingsSave, ConfigApis } from '../../store/actions/configActions';

function getStyles(muiTheme) {
  const { baseTheme: { spacing } } = muiTheme;
  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: spacing.desktopGutterMini,
    },
    spacer: { flex: 1 },
    iconStyle: {
      height: 20,
    },
    container: {
      display: 'flex',
    },
    leftTable: {
      flex: 1,
    },
  };
}

class SettingPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      setting: {
        optionId: 0,
        description: '',
        group: '',
        option: '',
        value: '',
      },
    };
  }
  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('settings'); }
  }

  handleClick = (option) => {
    const idx = this.props.settings.findIndex((item) => { return item.option === option; });
    const setting = this.props.settings[idx];
    const state = Object.assign(this.state, { setting });
    this.setState(state);
    this.settingDialog.handleOpen(setting);
  }

  handleRefresh = () => {
    this.props.rpcInvoke(ConfigApis.SysOptsQuery, {}, settingsSave, false);
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    const rows = this.props.settings.map((item) => {
      return (<SettingListRow rowData={ item } onHandleJump={ this.handleClick } />);
    });

    return (
      <div >
        <div style={ styles.root }>
          <TextField hintText='Search' />
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Query' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
          </div>
        </div>
        <div style={ styles.container }>
          <Table
            wrapperStyle={ styles.leftTable }
          >
            <TableHeader
              displaySelectAll={ false }
              adjustForCheckbox={ false }
              enableSelectAll={ false }
            >
              <TableRow>
                <TableHeaderColumn style={ { width: 120 } }>Category</TableHeaderColumn>
                <TableHeaderColumn>Option</TableHeaderColumn>
                <TableHeaderColumn>Value</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn style={ { width: 80 } }>OP.</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={ false }
            >
              {rows}
            </TableBody>
          </Table>
          <SettingDialog
            innerRef={ (inputEl) => {
              this.settingDialog = inputEl;
            } }
            muiTheme={ this.props.muiTheme }
          />
        </div>
      </div>
    );
  }
}

SettingPage.propTypes = {
  setCurrentPage: PropTypes.func,
  rpcInvoke: PropTypes.func,
  muiTheme: PropTypes.object,
  settings: PropTypes.object,
};

/*eslint-disable */
const SettingListRow = ({ rowData, onHandleJump }) => {
  const { option, group, value, description } = rowData;

  const handleJump = () => { onHandleJump(option); };

  return (<TableRow key={ option } >
        <TableRowColumn style={ { width: 120 } }>{ group }</TableRowColumn>
        <TableRowColumn>{ option }</TableRowColumn>
        <TableRowColumn>{ value }</TableRowColumn>
        <TableRowColumn>{ description }</TableRowColumn>
        <TableRowColumn style={ { width: 80 } }>
          <IconButton iconStyle={ styles.iconStyle } onClick={ handleJump }><ModeEditIcon /></IconButton >
        </TableRowColumn>
      </TableRow>);
};
/*eslint-enable */

const NewComponent = AuthConnect(
  SettingPage,
  (state) => ({
    settings: state.config.get('settings'),
  }),
  {});

export default NewComponent;
