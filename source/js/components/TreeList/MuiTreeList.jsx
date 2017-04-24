import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import { List,ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField'
import ContentClear from 'material-ui/svg-icons/content/clear';

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import Subheader from 'material-ui/Subheader';

const MuiIcons = require('material-ui/svg-icons');

const styles = {
  innerDivStyle:{
    paddingLeft: 48
  }
};

class MuiTreeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
       nodes: this.props.nodes
    }
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }

  handleTouchTap(e) {
     console.log(' touch tap ======~~~~~');
     console.log(e);
  }

  handleNestedToggle(e, nodeItem) {
     console.log(' nest toggle ======~~~~~');
     console.log(nodeItem);
  }

  render() {

    const getLeftIcon = (nodeItem) => {

      let { icon } = nodeItem;
      let { useFolderIcons } = this.props;

      if ( useFolderIcons && !icon) {
        if (nodeItem.children) {
            return <FolderIcon />
        } else {
            return <FileIcon />
        }
      } else {
        let SpecificIcon = MuiIcons[ icon ];
        return <SpecificIcon/>;
      }
    }

    const loopNodes = data => {

      let {nodeRemovable, onNodeRemove, itemStyle} = this.props;

      return data.map((item) => {
        let leftIcon = getLeftIcon( item );

        if (item.children) {

          let nestedNodes = loopNodes (item.children);
          return (
            <MuiTreeItems 
              key={ item.key } 
              style={ itemStyle }
              leftIcon={leftIcon}
              nodeItem={ item }
              innerDivStyle={ styles.innerDivStyle }
              primaryTogglesNestedList={true}
              onNestedListToggle={ this.handleNestedToggle }
              primaryText={ item.title }
              nestedItems={ nestedNodes } >
              </MuiTreeItems>
          );
        }

        return (
          <MuiTreeItem 
            key={ item.key } 
            leftIcon={ leftIcon } 
            nodeItem={ item }
            onTouchTap={ this.handleTouchTap }
            innerDivStyle={ styles.innerDivStyle }
            primaryText={ item.title }
            nodeRemovable={ nodeRemovable }
            onNodeRemove={ onNodeRemove }
            style={ itemStyle } >
          </MuiTreeItem>
        );
      });
    };

    const rootChildren = loopNodes(this.state.nodes);

    return (
      <List style={this.props.style}>
        {rootChildren}
      </List>
    );
  }
}

const MuiTreeItem = ({nodeItem, onTouchTap, nodeRemovable,onNodeRemove, ...rest }) => {
  const handleTouchTap = ()=>{
    if(onTouchTap) onTouchTap(nodeItem);
  }
  const handleRemove = ()=>{
    if(onNodeRemove) onNodeRemove(nodeItem);
  }
  return (
    <ListItem
      onTouchTap={ handleTouchTap }
      rightIconButton={ nodeRemovable && <IconButton onTouchTap={ handleRemove }><ContentClear/></IconButton> }
      {...rest}
    />);
};

const MuiTreeItems = ({nodeItem, onNestedListToggle, ...rest }) => {
  const handleNestedListToggle = (e)=>{
    if(onNestedListToggle) onNestedListToggle(e, nodeItem);
  }
  return (
    <ListItem
      onNestedListToggle={ handleNestedListToggle }
      {...rest}
    />);
};

MuiTreeList.propTypes = {
  nodeRemovable: PropTypes.bool,
  onNodeRemove: PropTypes.func,
}

export default MuiTreeList
