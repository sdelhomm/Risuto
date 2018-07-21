import React from 'react';
import {View} from 'react-native';
import Navigator from './components/Navigator.js';

export default class App extends React.Component
{
	shouldComponentUpdate()
	{
		return (false);
	}

	render()
	{
		const flex = {
			flex: 1
		};
		return (
			<View style={flex}>
				<Navigator />
			</View>
		);
	}
}
