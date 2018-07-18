import React from 'react'
import { } from 'react-native'
import Search from './Search.js'
import MovieInfos from './MovieInfos.js'
import AddToList from './AddToList.js'
import { createStackNavigator } from 'react-navigation'

export default createStackNavigator({
	Find: {
		screen: Search,
		navigationOptions: {
			header: null
		}
	},
	MovieInfos: {
		screen: MovieInfos,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22'
			},
			headerTintColor: '#ffffff'
		}
	},
	AddToList:{
		screen: AddToList,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22'
			},
			headerTintColor: '#ffffff'
		}
	}
});