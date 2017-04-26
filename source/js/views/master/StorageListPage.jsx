import React from 'react';
import PropTypes from 'prop-types';


const getStyles = function (muiTheme) {
  const { baseTheme } = muiTheme;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 10,
    },
    spacer: { flex: 1 },
    iconStyle: {
      height: 20,
    },
    search: {
      marginRight: baseTheme.spacing.desktopGutterLess,
    },
    select: {
      width: 200,
      marginRight: baseTheme.spacing.desktopGutterLess,
    } };
};

class StorageListPage extends React.Component {

  componentWillMount() {
    if (this.props.setCurrentPage) { this.props.setCurrentPage('storagelist'); }
  }

  render() {
    const styles = getStyles(this.props.muiTheme);

    return (
      <div>
        <h2 className='alt-header'>About </h2>
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

StorageListPage.propTypes = {
  muiTheme: PropTypes.object,
  setCurrentPage: PropTypes.func,
};

const NewComponent = AuthConnect(
  StorageListPage,
  (state) => ({
    storagelist: state.master.get('storagelist'),
  }),
  { saveDictsFilter, clearDictsFilter });

export default StorageListPage;
