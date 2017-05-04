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
import { saveImages,
  saveImagesFilter,
  MasterApis } from '../../store/actions/masterActions';

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
    select: {
      width: 200,
      marginRight: baseTheme.spacing.desktopGutterLess,
    } };
};

class ImageListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFilterCategory = this.handleFilter.bind(null, 'category');
    this.onFilterFormat = this.handleFilter.bind(null, 'format');
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('imagelist'); }
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
    const { category, format } = this.props.imagelist.toJS();
    const params = { category, format };

    this.props.rpcInvoke(MasterApis.ImagesQuery, params, saveImages);
  }

  handleClear = () => {
    const filter = {
      category: '',
      format: '',
      images: [],
    };

    this.props.saveImagesFilter(filter);
  }

  handleFilter = (key, event, newVal, payload) => {
    const filter = {};
    const selects = ['category', 'format'];

    if (selects.indexOf(key) >= 0) {
      filter[key] = payload;
    } else {
      filter[key] = newVal;
    }
    this.props.saveImagesFilter(filter);
  }

  render() {
    const { images, category, format } = this.props.imagelist.toJS();

    const styles = getStyles(this.props.muiTheme);

    const rows = images.map((item) => {
      return (<StorageListRow
        key={ `row_${ item['image-id'] }` }
        rowData={ item }
        styles={ styles }
        onHandleJump={ this.handleJump }
      />);
    });

    return (
      <div>
        <div style={ styles.root }>
          <SelectField
            style={ styles.select }
            value={ category }
            hintText='The Image Category'
            onChange={ this.onFilterCategory }>
            <MenuItem value={ 'POST_IMAGE' } primaryText='Post Image' />
            <MenuItem value={ 'USER_AVATAR' } primaryText='User Avatar' />
            <MenuItem value={ 'WGROUP_AVATAR' } primaryText='Workgroup Avatar' />
          </SelectField>
          <SelectField
            style={ styles.select }
            value={ format }
            hintText='The Format'
            onChange={ this.onFilterFormat }>
            <MenuItem value={ 'jpg' } primaryText='JPG' />
            <MenuItem value={ 'jpeg' } primaryText='JPEG' />
            <MenuItem value={ 'png' } primaryText='PNG' />
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
      </div>
    );
  }
}

ImageListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
};

const NewComponent = AuthConnect(
  ImageListPage,
  (state) => ({
    imagelist: state.master.get('imagelist'),
  }),
  { saveImagesFilter });

export default NewComponent;
