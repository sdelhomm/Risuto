import React from 'react'
import { } from 'react-native'
import Home from './Home.js'
import CreateList from './CreateList.js'
import ListManager from './ListManager.js'
import MovieInfos from './MovieInfos.js'
import { createStackNavigator } from 'react-navigation'

export default createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			header: null
		}
	},
	CreateList: {
		screen: CreateList,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22'
			},
			headerTintColor: '#ffffff'
		}
	},
	ListManager: {
		screen: ListManager,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22'
			},
			headerTintColor: '#ffffff'
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
	}
});