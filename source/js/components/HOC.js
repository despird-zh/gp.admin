import React from 'react';

export default (ComposedComponent) => class extends React.Component {
	
        constructor(props) {
          super(props);
          this.state = {};
        }

        test = function() {
        	console.log('ddddd');
        	return this.props.authenticated;
        }

        rpcInvoke = (action, databody) => {
        	Console.log(action);
        }

        render() {
        	console.log(this.props);
            return <ComposedComponent 
            {...this.props}
            {...this.state} 
            isAuthenticated={this.test.bind(this)} 
            />;
        }
	};
