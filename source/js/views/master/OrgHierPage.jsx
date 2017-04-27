import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Avatar from 'material-ui/Avatar';

import SocialGrpAdd from 'material-ui/svg-icons/social/group-add';
import SocialPsnAdd from 'material-ui/svg-icons/social/person-add';
import AuthConnect from '../../components/AuthConnect';
import MuiTreeList from '../../components/TreeList/MuiTreeList';
import UserAutoComplete from '../common/UserAutoComplete';
import OrgHierInfo from './OrgHierInfo';

import { saveOrgHier,
  MasterApis } from '../../store/actions/masterActions';

const SelectableList = makeSelectable(List);

const getStyles = function (muiTheme) {
  const { baseTheme: { spacing, palette } } = muiTheme;
  return {
    rootStyle: {
      display: 'flex',
    },
    spacer: { flex: 1 },
    topFull: {
      flexBasis: '100%',
      display: 'flex',
      marginTop: 10,
    },
    inputItem: {
      width: 320,
      marginLeft: spacing.desktopGutterMini,
      marginRight: spacing.desktopGutterMini,
    },
    panelTitle: {
      color: palette.secondaryTextColor,
      fontSize: 16,
      marginBottom: spacing.desktopGutterMini,
      marginTop: spacing.desktopGutterMini,
    },
    halfStyle: {
      flexBasis: '33.33%',
      paddingLeft: spacing.desktopGutterMini,
      paddingRight: spacing.desktopGutterMini,
    },
    iconBtnStyle: {
      float: 'right',
      width: 28,
      height: 28,
      padding: 2,
      marginRight: 16,
    },
    activeBtnIconStyle: {
      fill: palette.disabledColor,
      color: palette.disabledColor,
    },
    btnIconStyle: {
      fill: palette.primary2Color,
      color: palette.primary2Color,
    },
  };
};
class OrgHierPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      orgmember: {},
      orgnode: {},
      infomode: 'mbr-add', // org-add, org-info
    };
    this.handleMemberAdd = this.handleModeChange.bind(null, 'mbr-add');
    this.handleOrgAdd = this.handleModeChange.bind(null, 'org-add');
    this.handleOrgInfo = this.handleModeChange.bind(null, 'org-info');
  }

  handleModeChange = (mode) => {
    this.setState({ infomode: mode });
  }

  handleMemberChange = (evt, member) => {
    console.log(member);
  }

  handleMemberRemove = (userId) => {
    let orgmembers = this.props.orghier.get('orgmembers');
    let newmembers = orgmembers.filter((item) => {

      return item.id !== userId;
    });

    this.props.saveOrgHier({orgmembers: newmembers});
  }

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('orghier'); }
  }

  render() {
    const styles = getStyles(this.props.muiTheme);
    let {orgmember, orgnode, infomode, mbrlistval} = this.state;
    let { orgnodes, orgmembers } = this.props.orghier.toJS();

    let memberItems = orgmembers.map((item) => {
      return (
        <MemberListItem key={item.id} 
          itemData={item} 
          onItemRemove={ this.handleMemberRemove }
          />
      );
    });

    return (
      <div >
        <div style={ styles.topFull }>
          <div style={ styles.spacer } />
          <div>
            <RaisedButton label='Refresh' style={ { margin: 4 } } onTouchTap={ this.handleRefresh } />
          </div>
        </div>
        <div style={ styles.rootStyle }>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Hierarchy </h3>
            <Divider />
            <MuiTreeList
              nodes={ orgnodes }
              useFolderIcons={ true }
              nodeRemovable={ true }
              onNodeRemove={ () => {} }
            />
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Members </h3>
            <Divider />
            <List>
              { memberItems }
            </List>
          </div>
          <div style={ styles.halfStyle }>
            <h3 style={ styles.panelTitle }>Detail
              <IconButton
                style={ styles.iconBtnStyle }
                iconStyle={ infomode === 'org-add' ? styles.activeBtnIconStyle : styles.btnIconStyle }
                disabled={ infomode === 'org-add' }
                onTouchTap={ this.handleOrgAdd } >
                <SocialGrpAdd />
              </IconButton>
              <IconButton
                style={ styles.iconBtnStyle }
                iconStyle={ infomode === 'mbr-add' ? styles.activeBtnIconStyle : styles.btnIconStyle }
                disabled={ infomode === 'mbr-add' }
                onTouchTap={ this.handleMemberAdd } >
                <SocialPsnAdd />
              </IconButton>
            </h3>
            <Divider />
            <OrgHierInfo
              styles={ styles }
              onHandleClear={ () => {} }
              onHandleSave={ () => {} }
              rpcInvoke={ this.props.rpcInvoke }
              muiTheme={ this.props.muiTheme }
            />
          </div>
        </div>
      </div>
    );
  }
}

OrgHierPage.propTypes = {
  setCurrentPage: PropTypes.func,
  rpcInvoke: PropTypes.func,
  orghier: PropTypes.object,
  muiTheme: PropTypes.object,
};

/* eslint-disable */
const MemberListItem = ({itemData, onItemRemove, ...rest}) => {
  let avatar = <Avatar src={itemData.avatar} />;
  let handleItemRemove = () => {
    onItemRemove(itemData.id);
  };
  return (<ListItem
    primaryText={itemData.name}
    leftAvatar={ avatar }
    rightIconButton={ <IconButton onTouchTap={ handleItemRemove }><ContentClear /></IconButton> }
    value={ itemData.id }
    {...rest} >
  </ListItem>);
};
/* eslint-enable */

const NewComponent = AuthConnect(
  OrgHierPage,
  (state) => ({
    orghier: state.master.get('orghier'),
  }),
  {saveOrgHier}
);

export default NewComponent;
