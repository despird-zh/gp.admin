import React from 'react';
import MuiTreeList from '../..components/TreeList/MuiTreeList'

var nodes = [
  {
    key: 'k1',
    title: 'Title1'
  },{
    key: 'k2',
    title: 'Title2'
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
        
      </div>
    );
  };
}

export default OrgHierPage;