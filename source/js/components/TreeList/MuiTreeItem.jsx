import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import SocialGrp from 'material-ui/svg-icons/social/group';
import IconButton from 'material-ui/IconButton';

const styles = {
      
      contentStyle: {
        display: 'inline-block',
      },

      titleStyle: {
        textAlign: 'middle'
      },

      iconStyle: {
        height:20, 
        width: 20, 
        verticalAlign:'middle'
      }
    };

class MuiTreeItem extends Component {

  constructor(props) {
    super(props)
  }

  getLeftIcon = () => {
  	let { useFolderIcons, icon } = this.props;
    if (useFolderIcons) {
      if (children) {
          return <FolderIcon />
      } else {
          return <FileIcon />
      }
    } else {
      return icon
    }
  }

  handleTouchTap = (e) => {
  	console.log(e);
  }

  render(){
    
  	const { nodePath, nodeItem, style, depth, root ,active, disabled } = this.props;

    const nodeHeight = (this.props.nodeHeight) ? this.props.nodeHeight : '48px'

    let baseStyle = {
        paddingLeft: depth * 16,
        backgroundColor: (active) ? 'rgba(0,0,0,0.2)' : null,
        height: nodeHeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.87)',
        overflow: 'hidden',
        transform: 'translateZ(0)'                       
      };
      
    return (
      <div>
        <ListItem
          style={ Object.assign({}, baseStyle, style) }
          leftIcon={ this.getLeftIcon() }
          rightIcon={ (!this.props.children) ? <OpenIcon /> : <CloseIcon /> }
          onTouchTap={ this.handleTouchTap }>
          <div style={ styles.contentStyle }> <span style={ styles.titleStyle }>{ nodeItem.title} </span><SocialGrp style={ styles.iconStyle }/></div>
        </ListItem>
        {React.Children.map(this.props.children, (item, index) => {
          return root.renderTreeNode(item, index, depth + 1, nodePath);
        }, root)}
      </div>
	  )
  }
}

MuiTreeItem.propTypes = {
    nodeItem: PropTypes.object.isRequired,
    nodePath: PropTypes.string,
    style: PropTypes.object,
}

export default MuiTreeItem;