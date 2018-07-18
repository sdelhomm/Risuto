import React from 'react'
import { View, Text, Switch } from 'react-native'
import Style from '../style/Style.js'

export default class Settings extends React.Component {
	render () {
		return (
			<View style={Style.globalContainer} >
				<View style={Style.container} >
					<Text style={Style.mediumText} >Mode cinéma</Text>
					<Switch style={Style.switch} />
				</View>
			</View>
			);
	}
}