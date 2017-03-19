import React from 'react';

const styles = {
	root: {
		display: 'flex', 
		position: 'relative',
		marginTop: 15
	},
	spacer: { flex: 1 }
}
export default PageToolbar extends React.Component {

	render() {

		const {leftItems, rightItems} = this.props;
		
		return (
			<div style={ styles.root }>
        ( leftItems )
        <div style={ styles.spacer } />
        <div>
            ( rightItems )
        </div>
      </div>
		);
	}
}