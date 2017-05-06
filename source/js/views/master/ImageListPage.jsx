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
    },
    imageBG: {
      height: 30,
      width: 30,
      backgroundSize:'contain',
      backgroundRepeat: 'no-repeat',
    }
  };
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

  handleJump = (imageId) => {
    const images = this.props.imagelist.get('images');
    const idx = images.findIndex((item) => {
      return item['image-id'] === imageId;
    });
    const image = images[idx];
    this.storageDialog.handleOpen(image);
  }

  handleQuery = () => {
    const params = this.props.mapJson(
      this.props.imagelist, [
      'category','format'
      ]);

    this.props.rpcInvoke(MasterApis.ImagesQuery, params, (json) => { 
      return saveImages({images: json});
    });
  }

  handleClear = () => {
    const filter = {
      category: '',
      format: '',
      images: [],
    };

    this.props.saveImages(filter);
  }

  handleFilter = (key, event, newVal, payload) => {
    const filter = {};
    const selects = ['category', 'format'];

    if (selects.indexOf(key) >= 0) {
      filter[key] = payload;
    } else {
      filter[key] = newVal;
    }
    this.props.saveImages(filter);
  }

  render() {
    const { images, category, format } = this.props.mapJson(
      this.props.imagelist, [
      'images','category','format'
      ]);

    const styles = getStyles(this.props.muiTheme);

    const rows = images.map((item) => {
      return (<ImageListRow
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
              <TableHeaderColumn>Image</TableHeaderColumn>
              <TableHeaderColumn>Format</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>File Name</TableHeaderColumn>
              <TableHeaderColumn>URL</TableHeaderColumn>
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
  imagelist: PropTypes.object,
  saveImages: PropTypes.func,
  rpcInvoke: PropTypes.func,
};

/*eslint-disable */
const ImageListRow = ({styles, rowData, onHandleJump}) => {

  const { 'image-id':imageId, format, 
          category, 'image-name':imageName, 'image-url':imageUrl } = rowData;

  const handleJump = () => { onHandleJump( imageId ); };

  let imgStyle = Object.assign({ backgroundImage: 'url(' + imageUrl + ')' }, styles.imageBG)

  return (<TableRow key={ imageId }>
    <TableRowColumn>
      <div style={imgStyle}></div>
    </TableRowColumn>
    <TableRowColumn> { format }</TableRowColumn>
    <TableRowColumn>{ category }</TableRowColumn>
    <TableRowColumn>{ imageName }</TableRowColumn>
    <TableRowColumn>{ imageUrl }</TableRowColumn>
    <TableRowColumn style={ { width: 80 } }>
      <IconButton iconStyle={ styles.iconStyle } onClick={ handleJump }><ModeEditIcon /></IconButton >
    </TableRowColumn>
  </TableRow>);
};
/*eslint-enable */

const NewComponent = AuthConnect(
  ImageListPage,
  (state) => ({
    imagelist: state.master.get('imagelist'),
  }),
  { saveImages });

export default NewComponent;
