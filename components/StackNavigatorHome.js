import {createStackNavigator} from 'react-navigation';
import Home from './Home.js';
import CreateList from './CreateList.js';
import ListManager from './ListManager.js';
import MovieInfos from './MovieInfos.js';

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
				backgroundColor: '#c60f22',
				borderBottomWidth: 0
			},
			headerTintColor: '#ffffff'
		}
	},
	ListManager: {
		screen: ListManager,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22',
				borderBottomWidth: 0
			},
			headerTintColor: '#ffffff'
		}
	},
	MovieInfos: {
		screen: MovieInfos,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#c60f22',
				borderBottomWidth: 0
			},
			headerTintColor: '#ffffff'
		}
	}
},
																																				{
																																					initialRouteName: 'Home',
																																					cardStyle: {backgroundColor: 'transparent'}
																																				});
