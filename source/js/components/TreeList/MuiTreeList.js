import React, {Component, PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ListItem from 'material-ui/List/ListItem'
import TextField from 'material-ui/TextField'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'

class TreeList extends Component {
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

    childIsTaggedWithSearch = (listItem) => {
      if (listItem.children) {
        for (let i = 0; i < listItem.children.length; i++) {
          if (listItems[i].searchMatched) {
              return true
          }
        }
      }
    }

    tagListItemsWithSearchTerm = (searchTerm, listItem) => {
    	const { contentKey } = this.props;

      const f = (listItem) => {
        const searchTerms = searchTerm.split(' ')
        let match = false
        let matchIndex, matchTermLength

        if (searchTerms[0] !== '') {
            searchTerms.forEach((searchTerm) => {
                const content = (listItem[contentKey]) ? listItem[contentKey] : ''
                matchIndex = content.toLowerCase().indexOf(searchTerm.toLowerCase())
                if (matchIndex !== -1) {
                    match = true
                    matchTermLength = searchTerm.length
                }
            })
        }

        if (match) {
            return Object.assign({}, listItem, {searchMatched: true, highlight: [matchIndex, matchTermLength]})
        } else {
            return listItem
        }
      }

      if (listItem) {
          return f(listItem)
      } else {
          return f
      }
		}

    renderListItem = (listItem) => {
    	const { contentKey } = this.props;
    	const searchTerm = (this.props.searchTerm) ? this.props.searchTerm : this.state.searchTerm;
    	listItem._styles ={
        root: {
            paddingLeft: listItem.depth * 16,
            backgroundColor: (activeListItem === i) ? 'rgba(0,0,0,0.2)' : null,
            height: listHeight,
            cursor: (listItem.disabled) ? 'not-allowed' : 'pointer',
            color: (listItem.disabled) ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.87)',
            overflow: 'hidden',
            transform: 'translateZ(0)'                       
        }
    	} 

    	if (searchTerm) {

        listItem._shouldRender = (listItem.searchMatched || this.childIsTaggedWithSearch(listItem))
        // highlighting search terms
        if (listItem.highlight) {
			    const left = listItem[contentKey].substring(0, listItem.highlight[0])
          const middle = listItem[contentKey].substring(listItem.highlight[0], listItem.highlight[0] + listItem.highlight[1])
          const right = listItem[contentKey].substring(listItem.highlight[0] + listItem.highlight[1])
          listItem._primaryText = <span>{left}<span style={{display: 'inline-block', backgroundColor: 'rgba(255,235,59,0.5)', padding: '3px'}}>{middle}</span>{right}</span>
        } else {
          listItem._primaryText = listItem[contentKey]
        }

      } else {

        listItem._shouldRender = true;
        listItem._primaryText = listItem[contentKey];

      }

      return <ListItem listItem: listItem />;
    }

    render() {
        // required props
        const {children, listItems, contentKey} = this.props
        // optional props
        const style = (this.props.style) ? this.props.style : {}
        const startingDepth = (this.props.startingDepth) ? this.props.startingDepth : 1
        const expandedListItems = (this.props.expandedListItems) ? this.props.expandedListItems : this.state.expandedListItems
        const activeListItem = (this.props.activeListItem) ? this.props.activeListItem : this.state.activeListItem
        const listHeight = (this.props.listHeight) ? this.props.listHeight : '48px'
        const {haveSearchbar, handleSearch} = this.props
        const searchTerm = (this.props.searchTerm) ? this.props.searchTerm : this.state.searchTerm;
        this.searchMode = (searchTerm) ? true : false;

        return (
    			<div style={Object.assign({}, styles.root, style)}>
            { haveSearchbar &&
              <form 
                  style={{padding: '0px 16px'}}
                  onSubmit={(e) => {
                      e.preventDefault()
                      if (handleSearch) {
                          handleSearch(document.getElementById('searchfield').value)
                      } else {
                          this.setState({searchTerm: document.getElementById('searchfield').value})
                      }
                      document.getElementById('searchfield').value = ''
                  }}>
                  <TextField
                      hintText="Search"
                      fullWidth={true}
                      id={'searchfield'} />
              </form>}
            <ReactCSSTransitionGroup transitionName="tree-list" transitionEnterTimeout={300} transitionLeaveTimeout={150}>
                {listItemsJSX}
            </ReactCSSTransitionGroup>
        	</div>
        );
    }
}

const ListItem = ({ listItem, ...props }) => {
	if (listItem._shouldRender) {
	    return (
	        <ListItem
	            key={'treeListItem-' + i}
	            primaryText={listItem._primaryText}
	            style={Object.assign({}, listItem._styles.root)}
	            leftIcon={getLeftIcon(listItem, this.props.useFolderIcons)}
	            rightIcon={(!listItem.children) ? null : (expandedListItems.indexOf(i) === -1) ? <OpenIcon /> : <CloseIcon />}
	            onTouchTap={()=> {
	                if (listItem.disabled) return
	                this.handleTouchTap(listItem, i)
	            }} />                   
	    )                   
	} else {
	    return null
	}
}
export default TreeList
