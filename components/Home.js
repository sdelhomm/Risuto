import React from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator, Alert } from 'react-native'
import Style from '../style/Style.js'
import Ionicons from 'react-native-vector-icons/Ionicons.js'

export default class Home extends React.Component {

	constructor(props) {
		super(props);

	 	this.state = {
	 		isReady: true,
	 		dataLists: null
	 	};
	}

	storeData = async (item, value) => {
		try {
			await AsyncStorage.setItem(item, value);
		}
		catch (error) {
			console.log(error);
		}
	}

	retrieveData = async (item) => {
		try {
			const value = await AsyncStorage.getItem(item);
			if (value !== null)
				return (value);
			else {
				return ('{"lists":[],"nextId":1,"favorites":[]}');
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	textLimiter(text, max) {
		if (text.length > max) {
			text = text.substr(0, max);
			text = text + '...'
			return (text);
		}
		return (text);
	}

	getLists () {
		this.setState({
			isReady: false
		});
		this.retrieveData('userData')
		.then((dataString) => JSON.parse(dataString))
		.then((dataObject) => {
			if (dataObject.lists.length > 0) {
				this.setState({
					isReady: true,
					dataLists: dataObject.lists
				});
				return ;
			}
			this.setState({
				isReady: true,
				dataLists: null
			});
		})
		.catch(() => alert('Impossible de charger les listes'));
	}

	componentDidMount () {
		this.props.navigation.addListener('willFocus', () => this.getLists ());
	}

	delList (listId) {
		this.retrieveData('userData')
		.then((dataString) => JSON.parse(dataString))
		.then((dataObject) => {
			let toDel = dataObject.lists.findIndex((element) => element.id == listId );
			Alert.alert('Attention','Voulez vous vraiment supprimmer la liste \"'+dataObject.lists[toDel].name+'\" ?',
				[
				{text: 'Annuler', onPress: () => {return ;}, style: 'cancel'},
				{text: 'Supprimmer', onPress: () => {
					let toDel = dataObject.lists.findIndex((element) => element.id == listId );
					dataObject.lists.splice(toDel, 1);
					dataObject = JSON.stringify(dataObject);
					this.storeData('userData', dataObject)
					.then(() => this.getLists());
				} }
				]);
		})
		.catch(() => alert('Impossible de supprimmer cette liste'));
	}

	render () {
		if (this.state.isReady) {
			return (
				<View style={Style.globalContainer} >
					<TouchableOpacity
					activeOpacity={0.7}
					style={Style.button}
					onPress={() => this.props.navigation.navigate('CreateList')}
					>
						<Text style={Style.buttonText} >Nouvelle liste</Text>
					</TouchableOpacity>
					<FlatList
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={Style.listsHome.flatList}
					data={this.state.dataLists}
					renderItem={({item}) => (
						<TouchableOpacity
						onPress={ () => this.props.navigation.navigate('ListManager', { list: item })} //!\\
						activeOpacity={0.7}
						>
							<View style={Style.listsHome.container} >
								<Text style={Style.listsHome.name} >{this.textLimiter(item.name, 14)}</Text>
								<TouchableOpacity
								onPress={() => this.delList(item.id)}
								activeOpacity={0.6}
								style={Style.listsHome.delIcon}
								>
										<Ionicons name='ios-close' size={40} color='white' />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
						)}
					keyExtractor={ (item) => item.id.toString() }
					/>
				</View>
				);
		}
		return (
			<View style={Style.globalContainer} >
				<TouchableOpacity
				activeOpacity={0.7} 
				style={Style.button}
				onPress={() => this.props.navigation.navigate('CreateList')}
				>
					<Text style={Style.buttonText} >Nouvelle liste</Text>
				</TouchableOpacity>
				<ActivityIndicator style={{marginVertical: 30}} size='large' />
			</View>
			);
	}
}