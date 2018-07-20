import React from 'react';
import { } from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import StackNavigatorHome from './StackNavigatorHome.js';
import StackNavigatorSearch from './StackNavigatorSearch.js';
import Settings from './Settings.js';


export default createMaterialBottomTabNavigator({
	SearchScreen: {screen: StackNavigatorSearch,
		navigationOptions: {
			tabBarLabel: 'Rechercher',
			tabBarIcon: ({tintColor}) => (
				<Ionicons name='ios-search' color={tintColor} size={28} />
			)
		}
	},
	HomeScreen: {screen: StackNavigatorHome,
		navigationOptions: {
			tabBarLabel: 'Acceuil',
			tabBarIcon: ({tintColor}) => (
				<Ionicons name='ios-home' color={tintColor} size={28} />
			)
		}
	},
	SettingsScreen: {screen: Settings,
		navigationOptions: {
			tabBarLabel: 'Paramètres',
			tabBarIcon: ({tintColor}) => (
				<Ionicons name='ios-settings' color={tintColor} size={28} />
			)
		}
	}
}, {
	initialRouteName: 'HomeScreen',
	activeTintColor: 'white',
	shifting: true,
	barStyle: {backgroundColor: '#c60f22'}
});
