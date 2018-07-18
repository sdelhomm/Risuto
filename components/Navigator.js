import React from 'react'
import { } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons.js'
import StackNavigatorHome from './StackNavigatorHome.js'
import StackNavigatorSearch from './StackNavigatorSearch.js'
import Settings from './Settings.js'
import Style from '../style/Style.js'

export default createMaterialBottomTabNavigator({
	Search: {screen: StackNavigatorSearch,
		navigationOptions: {
			tabBarLabel: 'Rechercher',
			tabBarIcon: ({ tintColor })=>(
				<Ionicons name='ios-search' color={tintColor} size={28} />
			)
		}
	},
	Home: {screen: StackNavigatorHome,
		navigationOptions: {
			tabBarLabel: 'Acceuil',
			tabBarIcon: ({ tintColor }) =>(
					<Ionicons name='ios-home' color={tintColor} size={28} />
			)
		}
	},
	Settings: {screen: Settings,
		navigationOptions: {
			tabBarLabel: 'Paramètres',
			tabBarIcon: ({ tintColor })=>(
				<Ionicons name='ios-settings' color={tintColor} size={28} />
			)
		}
	}
}, {
	initialRouteName: 'Home',
	activeTintColor: 'white',
	shifting: true,
	barStyle: Style.navigation
});