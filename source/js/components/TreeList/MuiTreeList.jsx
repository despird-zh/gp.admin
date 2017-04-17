import React, {Component, PropTypes} from 'react'

import ListItem from 'material-ui/List/ListItem'
import TextField from 'material-ui/TextField'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'

class MuiTreeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expandedListItems: [],
            activeListItem: null,
            searchTerm: ''
        }
        this.searchMode = false
        this.handleTouchTap = this.handleTouchTap.bind(this)
    }

    handleTouchTap(listItem, index) {
        
    }

  renderTreeNode(child, index, depth = 0, pkey = '') {

    const key = `${pkey}-${child.key}`;

    const cloneProps = {
      ref: `treeNode-${key}`,
      root: this,
      nodeKey: key,
      depth,
    };

    return React.cloneElement(child, cloneProps);
  }

    render() {
        console.log(this.props);
        // required props
        const {children} = this.props
        // optional props
        const style = (this.props.style) ? this.props.style : {}
        const listHeight = (this.props.listHeight) ? this.props.listHeight : '48px'

        // styles for entire wrapper
        const styles = {
            root: {
                padding: 0,
                paddingBottom: 8,
                paddingTop: (children) ? 0 : 8,
            }
        }

        return (
    		<div style={Object.assign({}, styles.root, style)}>
            {React.Children.map(children, this.renderTreeNode, this)}
        	</div>
        );
    }
}

export default MuiTreeList
