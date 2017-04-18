import React from 'react';
import SocialGrp from 'material-ui/svg-icons/social/group';
import MuiTreeList from '../../components/TreeList/MuiTreeList'
import MuiTreeItem from '../../components/TreeList/MuiTreeItem'
var nodes = [
  {
    key: 'k1',
    title: 'Title1'
  },{
    key: 'k2',
    title: 'Title2',
    children: [
      {
        key: 'k21',
        title: 'Title21'
      },
      {
        key: 'k22',
        title: 'Title22'
      }
    ]
  }
];



class OrgHierPage extends React.Component { 

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('orghier');
  }

  render() {
   
    return (
      <div>
        <MuiTreeList nodes={nodes}>
        </MuiTreeList>
      </div>
    );
  };
}

export default OrgHierPage;