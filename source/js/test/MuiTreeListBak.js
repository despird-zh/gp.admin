import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import MuiTreeItem from './MuiTreeItem'

class MuiTreeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
       nodes: this.props.nodes
    }
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }

  handleTouchTap(listItem, index) {
     
  }

  renderTreeNode(child, index, depth = 0, pNodePath) {

    const {useFolderIcons} = this.props;
    const nodePath = (pNodePath) ? `${pNodePath}-${child.key}` : `${child.key}`;
    
    const cloneProps = {
      ref: `treeNode-${nodePath}`,
      root: this,
      nodePath,
      depth,
      useFolderIcons
    };

    return React.cloneElement(child, cloneProps);
  }

  render() {

    const loopNodes = data => {
      return data.map((item) => {
        if (item.children) {
          return (
            <MuiTreeItem key={ item.key } nodeItem={ item } style={ this.props.itemStyle }>
              { loopNodes (item.children) }
            </MuiTreeItem>
          );
        }
        return <MuiTreeItem key={ item.key } nodeItem={ item } style={ this.props.itemStyle }/>;
      });
    };

    // required props
    const rootChildren = loopNodes(this.state.nodes);
    // optional props
    const style = (this.props.style) ? this.props.style : {}

    // styles for entire wrapper
    const baseStyle = {
      padding: 0,
      paddingBottom: 8,
      paddingTop: (rootChildren) ? 0 : 8,
    }

    return (
          <List style={Object.assign({}, baseStyle, style)}>
        {React.Children.map(rootChildren, this.renderTreeNode, this)}
        </List>
    );
  }
}

MuiTreeList.propTypes = {
    nodes: PropTypes.array.isRequired,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    handleTouchTap: PropTypes.func,
    handleTouchTapInSearchMode: PropTypes.func,
    handleSearch: PropTypes.func,
    useFolderIcons: PropTypes.bool
};

export default MuiTreeList
