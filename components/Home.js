import React from 'react';
import {View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Alert,
	StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import {storeData, retrieveData, getStyleSheet} from './DataManager.js';

export default class Home extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			isReady: true,
			dataLists: null,
			Style: null
		};
	}

	textLimiter(text, max)
	{
		if (text.length > max)
		{
			text = text.substr(0, max);
			text += '...';
			return (text);
		}
		return (text);
	}

	getLists()
	{
		this.setState({
			isReady: false
		});
		retrieveData('userData')
		.then(dataString => JSON.parse(dataString))
		.then((dataObject) =>
		{
			if (dataObject.lists.length > 0)
			{
				this.setState({
					isReady: true,
					dataLists: dataObject.lists
				});
				return;
			}
			this.setState({
				isReady: true,
				dataLists: null
			});
		})
		.catch(() => Alert.alert('Impossible de charger les listes'));
	}

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Styles => this.setState({Style: Styles})));
		this.props.navigation.addListener('willFocus', () => this.getLists());
	}

	delList(listId)
	{
		retrieveData('userData')
		.then(dataString => JSON.parse(dataString))
		.then((dataObject) =>
		{
			const toDel = dataObject.lists.findIndex(element => element.id === listId);
			Alert.alert('Attention', `Voulez vous vraiment supprimmer la liste "${dataObject.lists[toDel].name}" ?`,
															[
																{text: 'Annuler', onPress: () => {}, style: 'cancel'},
																{text: 'Supprimmer',
																	onPress: () =>
																	{
																		dataObject.lists.splice(toDel, 1);
																		dataObject = JSON.stringify(dataObject);
																		storeData('userData', dataObject)
																		.then(() => this.getLists());
																	}}
															]);
		})
		.catch(() => Alert.alert('Impossible de supprimmer cette liste'));
	}

	render()
	{
		if (this.state.Style === null)
		{
			getStyleSheet().then(Styles => this.setState({Style: Styles}));
			return (null);
		}
		StatusBar.setBarStyle(`${this.state.Style.unTheme}-content`);
		if (this.state.isReady)
		{
			return (
				<View style={this.state.Style.globalContainer} >
					<TouchableOpacity
						activeOpacity={0.7}
						style={this.state.Style.button}
						onPress={() => this.props.navigation.navigate('CreateList')}>
						<Text style={this.state.Style.buttonText} >Nouvelle liste</Text>
					</TouchableOpacity>
					<FlatList
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={this.state.Style.listsHome.flatList}
						data={this.state.dataLists}
						renderItem={({item}) => (
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('ListManager', {list: item})} //!\\
								activeOpacity={0.7}>
								<View style={this.state.Style.listsHome.container} >
									<Text style={this.state.Style.listsHome.name} >{this.textLimiter(item.name, 14)}</Text>
									<TouchableOpacity
										onPress={() => this.delList(item.id)}
										activeOpacity={0.6}
										style={this.state.Style.listsHome.delIcon}>
										<Ionicons name='ios-close' size={40} color='white' />
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
						)}
						keyExtractor={item => item.id.toString()} />
				</View>
			);
		}
		return (
			<View style={this.state.Style.globalContainer} >
				<TouchableOpacity
					activeOpacity={0.7}
					style={this.state.Style.button}
					onPress={() => this.props.navigation.navigate('CreateList')}>
					<Text style={this.state.Style.buttonText} >Nouvelle liste</Text>
				</TouchableOpacity>
				<ActivityIndicator style={this.state.Style.margin} size='large' />
			</View>
		);
	}
}
