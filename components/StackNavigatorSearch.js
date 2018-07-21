import {createStackNavigator} from 'react-navigation';
import Search from './Search.js';
import MovieInfos from './MovieInfos.js';
import AddToList from './AddToList.js';

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
				backgroundColor: '#c60f22',
				borderBottomWidth: 0
			},
			headerTintColor: '#ffffff'
		}
	},
	AddToList: {
		screen: AddToList,
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
																																					initialRouteName: 'Find',
																																					cardStyle: {backgroundColor: 'transparent'}
																																				});
