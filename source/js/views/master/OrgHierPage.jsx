import React from 'react';
import SocialGrp from 'material-ui/svg-icons/social/group';
import MuiTreeList from '../../components/TreeList/MuiTreeList';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';

var nodes = [
  {
    key: 'k1',
    title: 'Title1',
    icon: 'ActionSupervisorAccount',
  },{
    key: 'k2',
    title: 'Title2 (5/41)',
    icon: 'SocialPeople',
    children: [
      {
        key: 'k21',
        title: 'Title21',
        icon: 'ActionSupervisorAccount',
      },
      {
        key: 'k22',
        title: 'Title22',
        icon: 'ActionSupervisorAccount',
      }
    ]
  }
];

const SelectableList = makeSelectable(List);

const getStyles = (muiTheme) => {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    rootStyle: {
      display: 'flex'
    },
    spacer: { flex: 1 },
    topFull: {
      flexBasis: '100%',
      display: 'flex', 
      marginTop: 10
    },
    panelTitle: {
      color: palette.secondaryTextColor,
      fontSize: 16, 
      marginBottom: spacing.desktopGutterMini,
      marginTop: spacing.desktopGutterMini,
    },
    halfStyle: {
      flexBasis: '50%',
      paddingLeft: spacing.desktopGutterMini,
      paddingRight: spacing.desktopGutterMini
    }
  };
}
class OrgHierPage extends React.Component { 

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('orghier');
  }

  render() {
    let styles = getStyles(this.props.muiTheme);

    return (
      <div >
        <div style={styles.topFull}>
          <div style={styles.spacer}/>
          <div>
              <RaisedButton label="Refresh" style={{margin: 4}} onTouchTap ={this.handleRefresh}/>
          </div>
        </div>
        <div style={ styles.rootStyle }>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Hierarchy </h3>
            <Divider/>
            <MuiTreeList nodes={ nodes } useFolderIcons={true}>
            </MuiTreeList>
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Members </h3>
            <Divider/>
            <SelectableList
                value={ 1 }
                onChange={this.handleMemberChange}>
                <ListItem
                  primaryText="Brendan Lim"
                  leftAvatar={<Avatar src="assets/img/ok-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={1}
                />
                <ListItem
                  primaryText="Eric Hoffman"
                  leftAvatar={<Avatar src="assets/img/kolage-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberRemove }><ContentRemove/></IconButton>}
                  value={2}
                />
                <ListItem
                  primaryText="Grace Ng - 永东科技"
                  leftAvatar={<Avatar src="assets/img/uxceo-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={3}
                />
                <ListItem
                  primaryText="Kerem Suer"
                  leftAvatar={<Avatar src="assets/img/kerem-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={4}
                />
                <ListItem
                  primaryText="Raquel Parrado"
                  leftAvatar={<Avatar src="assets/img/raquelromanp-128.jpg" />}
                  rightIconButton={<IconButton onTouchTap={ this.handleMemberDelete }><ContentClear/></IconButton>}
                  value={5}
                />
              </SelectableList>
            </div>
          </div>
      </div>
    );
  };
}

export default muiThemeable()(OrgHierPage);