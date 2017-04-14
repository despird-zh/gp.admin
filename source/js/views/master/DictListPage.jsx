import React from 'react';

// Since this component is simple and static, there's no parent container for it.
class DictListPage extends React.Component { 

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if(this.props.setCurrentPage)
      this.props.setCurrentPage('dictlist');
  }

  render() {
    return (
      <div>
        <h2 className='alt-header'>About </h2>
        <p>
          This example app is part of the <a href='https://github.com/coryhouse/react-slingshot'>React-Slingshot
          starter kit</a>.
        </p>
        <p>
           to see the 404 page.
        </p>
      </div>
    );
  };
}

export default DictListPage;