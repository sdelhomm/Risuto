import React from 'react'
import { View } from 'react-native'
import Navigator from './components/Navigator.js'

export default class App extends React.Component {
	render () {
		return (
			<View style={{flex: 1}}>
				<Navigator />
			</View>
			);
	}
}