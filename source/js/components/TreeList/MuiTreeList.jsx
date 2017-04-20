import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { List,ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'

import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';

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
          let nestedNodes = loopNodes (item.children);
          return (
            <ListItem 
              key={ item.key } 
              primaryText={item.title}
              style={ this.props.itemStyle }
              leftIcon={<ActionGrade />}
              primaryTogglesNestedList={true}
              nestedItems={ nestedNodes }
            />
          );
        }
        return <MuiTreeItem key={ item.key } nodeItem ={ item }leftIcon={<ContentSend />} primaryText={item.title} style={ this.props.itemStyle }/>;
      });
    };

    const rootChildren = loopNodes(this.state.nodes);

    return (
      <List>
        <Subheader>Nested List Items</Subheader>
        {rootChildren}
      </List>
    );
  }
}

const MuiTreeItem = ({nodeItem, ...rest }) => {
  console.log(nodeItem);
  return (<ListItem
            {...rest}
          />);
};

export default MuiTreeList
