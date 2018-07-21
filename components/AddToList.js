import React from 'react';
import {View,
	Text,
	Image,
	Picker,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	StatusBar} from 'react-native';
import {storeData, retrieveData, getStyleSheet} from './DataManager.js';

export default class AddToList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			isReady: true,
			selectedList: null,
			dataLists: null,
			Style: null
		};
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
					dataLists: dataObject.lists,
					dataObject
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
		this.getLists();
	}

	getPickers()
	{
		if (this.state.dataLists !== null)
		{
			const galery = this.state.dataLists.map((item, key) =>
			{
				if (item.movies.find(element => element.id === this.props.navigation.state.params.movieId) === undefined)
				{
					return (
						<Picker.Item
							key={key}
							label={item.name}
							value={item.id} />
					);
				}
			});
			return (galery);
		}
		return (null);
	}

	putMovie()
	{
		if (this.state.selectedList !== null)
		{
			let data = this.state.dataObject;
			const index = data.lists.findIndex(element => element.id === this.state.selectedList);
			data.lists[index].movies.push({
				id: this.props.navigation.state.params.movieId,
				posterPath: this.props.navigation.state.params.posterPath
			});
			data = JSON.stringify(data);
			storeData('userData', data)
			.then(() => this.props.navigation.navigate('Find'))
			.catch(() => Alert.alert('Impossible d\'ajouter le film'));
		}
		else

			Alert.alert('Merci de sélectionner une liste');
	}

	addButton()
	{
		if (this.state.selectedList !== null)
		{
			return (
				<TouchableOpacity
					activeOpacity={0.7}
					style={this.state.Style.button}
					onPress={() => this.putMovie()}>
					<Text style={this.state.Style.buttonText} >Ajouter</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				disabled
				activeOpacity={0.7}
				style={this.state.Style.buttonDisabled}
				onPress={() => this.putMovie()}>
				<Text style={this.state.Style.buttonText} >Ajouter</Text>
			</TouchableOpacity>
		);
	}

	render()
	{
		if (this.state.Style === null)
		{
			getStyleSheet().then(Styles => this.setState({Style: Styles}));
			return (null);
		}
		StatusBar.setBarStyle(`${this.state.Style.unTheme}-content`);
		if (!this.state.isReady)
		{
			return (
				<View style={this.state.Style.movieInfos.globalView} >
					<ActivityIndicator size='large' />
				</View>
			);
		}
		return (
			<View style={this.state.Style.globalContainer} >
				<View style={this.state.Style.shadow} >
					<Image
						style={this.state.Style.AddToList.image}
						source={{uri: `http://image.tmdb.org/t/p/w154${this.props.navigation.state.params.posterPath}`}} />
				</View>
				<Picker
					selectedValue={this.state.selectedList}
					itemStyle={this.state.Style.main}
					mode='dropdown'
					style={this.state.Style.picker}
					onValueChange={itemValue => this.setState({selectedList: itemValue})}>
					<Picker.Item label='Choisir une liste' value={null} />
					{this.getPickers()}
				</Picker>
				{this.addButton()}
			</View>
		);
	}
}
