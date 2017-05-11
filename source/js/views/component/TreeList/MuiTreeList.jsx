import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';

import ContentClear from 'material-ui/svg-icons/content/clear';

import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';

const MuiIcons = require('material-ui/svg-icons');

const styles = {
  innerDivStyle: {
    paddingLeft: 48,
  },
};

class MuiTreeList extends Component {

  handleTouchTap = (nodePath, nodeItem) => {
    if (this.props.onNodeTouchTap) this.props.onNodeTouchTap(nodePath, nodeItem);
  }

  handleNestedToggle = (open, nodePath, nodeItem) => {
    if (this.props.onNestedListToggle) this.props.onNestedListToggle(open, nodePath, nodeItem);
  }

  render() {
    const { useFolderIcons, nodes } = this.props;

    const getLeftIcon = (nodeItem) => {
      const { icon } = nodeItem;

      if (useFolderIcons && !icon) {
        if (nodeItem.children) {
          return <FolderIcon />;
        }
        return <FileIcon />;
      }
      const SpecificIcon = MuiIcons[icon];
      return <SpecificIcon />;
    };

    const loopNodes = (pkey, data) => {
      const { nodeRemovable, onNodeRemove, itemStyle } = this.props;

      return data.map((item) => {
        const leftIcon = getLeftIcon(item);
        const itemKey = `${ pkey }-${ item.key }`;

        if (item.children) {
          const nestedNodes = loopNodes(itemKey, item.children);
          return (
            <MuiTreeItems
              key={ itemKey }
              style={ itemStyle }
              nodePath={ itemKey }
              leftIcon={ leftIcon }
              nodeItem={ item }
              innerDivStyle={ styles.innerDivStyle }
              primaryTogglesNestedList={ true }
              onNestedListToggle={ this.handleNestedToggle }
              primaryText={ item.title }
              nestedItems={ nestedNodes }
            />
          );
        }

        return (
          <MuiTreeItem
            key={ itemKey }
            nodePath={ itemKey }
            leftIcon={ leftIcon }
            nodeItem={ item }
            onTouchTap={ this.handleTouchTap }
            innerDivStyle={ styles.innerDivStyle }
            primaryText={ item.title }
            nodeRemovable={ nodeRemovable }
            onNodeRemove={ onNodeRemove }
            style={ itemStyle }
          />
        );
      });
    };

    const rootChildren = loopNodes('root', nodes);

    return (
      <List style={ this.props.style }>
        {rootChildren}
      </List>
    );
  }
}

MuiTreeList.propTypes = {
  nodes: PropTypes.array,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  nodeRemovable: PropTypes.bool,
  useFolderIcons: PropTypes.bool,
  onNodeRemove: PropTypes.func,
  onNodeTouchTap: PropTypes.func,
  onNestedListToggle: PropTypes.func,
};

const MuiTreeItem = ({ nodePath, nodeItem, onTouchTap, nodeRemovable, onNodeRemove, ...rest }) => {
  const handleTouchTap = () => {
    if (onTouchTap) onTouchTap(nodePath, nodeItem);
  };
  const handleRemove = () => {
    if (onNodeRemove) onNodeRemove(nodePath, nodeItem);
  };
  return (
    <ListItem
      onTouchTap={ handleTouchTap }
      rightIconButton={ nodeRemovable && <IconButton onTouchTap={ handleRemove }><ContentClear /></IconButton> }
      { ...rest }
    />
  );
};

MuiTreeItem.propTypes = {
  nodePath: PropTypes.string,
  nodeItem: PropTypes.object,
  nodeRemovable: PropTypes.bool,
  onTouchTap: PropTypes.func,
  onNodeRemove: PropTypes.func,
};

const MuiTreeItems = ({ nodePath, nodeItem, onNestedListToggle, ...rest }) => {
  const handleNestedListToggle = (listItem) => {
    if (onNestedListToggle) onNestedListToggle(listItem.state.open, nodePath, nodeItem);
  };
  return (
    <ListItem
      onNestedListToggle={ handleNestedListToggle }
      { ...rest }
    />
  );
};
MuiTreeItems.propTypes = {
  nodePath: PropTypes.string,
  nodeItem: PropTypes.object,
  onNestedListToggle: PropTypes.func,
};

export default MuiTreeList;
