import React from 'react';
import MuiTreeList from '../../components/TreeList/MuiTreeList'
import MuiTreeNode from '../../components/TreeList/MuiTreeItem'
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
    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return (
            <MuiTreeNode
              key={item.key} title={item.title}
            >
              {loop(item.children)}
            </MuiTreeNode>
          );
        }
        return <MuiTreeNode key={item.key} title={item.title} />;
      });
    };
    return (
      <div>
        <MuiTreeList>
          loop(nodes)
        </MuiTreeList>
      </div>
    );
  };
}

export default OrgHierPage;