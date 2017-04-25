import React from 'react';
import PropTypes from 'prop-types';

class EntityListPage extends React.Component {


  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('entitylist'); }
  }

  render() {
    return (
      <div>
        <h2 className='alt-header'>About</h2>
        <p>
          This example app is part of the <a href='https://github.com/coryhouse/react-slingshot'>React-Slingshot
          starter kit {this.props.muiTheme.pallette}</a>.
        </p>
        <p>
          to see the 404 page.
        </p>
      </div>
    );
  }
}

EntityListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
};
export default EntityListPage;
