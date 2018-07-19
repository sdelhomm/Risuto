import React from 'react'
import { View, Text, Image, Picker, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native'
import Style from '../style/Style.js'

export default class AddToList extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			isReady: true,
			selectedList: null,
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
				return ('{"'+item+'":[]}');
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	getLists () {
		this.setState({
			isReady: false
		});
		this.retrieveData('lists')
		.then((dataString) => JSON.parse(dataString))
		.then((dataObject) => {
			if (dataObject.lists.length > 0) {
				this.setState({
					isReady: true,
					dataLists: dataObject.lists,
					dataObject: dataObject
				});
				return ;
			}
			this.setState({
				isReady: true,
				dataLists: null
			});
		})
		.catch((error) => alert('Impossible de charger les listes'));
	}

	componentDidMount () {
		this.getLists ();
	}

	getPickers () {
		if (this.state.dataLists !== null) {
			let galery = this.state.dataLists.map((item, key) => {
				if (item.movies.find((element) => element.id == this.props.navigation.state.params.movieId) === undefined)
				return (
					<Picker.Item
					key={key}
					label={item.name}
					value={item.id}
					/>
				);
			});
			return (galery);
		}
		return (null);
	}

	putMovie () {
		if (this.state.selectedList !== null) {
			let data = this.state.dataObject;
			let index = data.lists.findIndex((element) => element.id == this.state.selectedList );
			data.lists[index].movies.push({
				id: this.props.navigation.state.params.movieId,
				posterPath: this.props.navigation.state.params.posterPath
			});
			data = JSON.stringify(data);
			this.storeData('lists', data)
			.then(() => this.props.navigation.navigate('Find'))
			.catch(() => alert('Impossible d\'ajouter le film'));
		}
		else {
			alert('Merci de sélectionner une liste');
		}
	}

	addButton () {
		if (this.state.selectedList !== null) {
			return (
				<TouchableOpacity
				activeOpacity={0.7}
				style={Style.button}
				onPress={() => this.putMovie()}
				>
					<Text style={Style.buttonText} >Ajouter</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
			disabled={true}
			activeOpacity={0.7}
			style={Style.buttonDisabled}
			onPress={() => this.putMovie()}
			>
				<Text style={Style.buttonText} >Ajouter</Text>
			</TouchableOpacity>
		);
	}

	render () {
		if (!this.state.isReady) {
			return (
				<View style={Style.movieInfos.globalView} >
					<ActivityIndicator size='large'/>
				</View>
				);
		}
		return (
			<View style={Style.globalContainer} >
				<View style={Style.shadow} >
					<Image
					style={Style.AddToList.image}
					source={{uri: 'http://image.tmdb.org/t/p/w154' + this.props.navigation.state.params.posterPath}}
					/>
				</View>
				<Picker
				selectedValue={this.state.selectedList}
				style={{width: '100%', marginVertical: 10}}
				onValueChange={(itemValue) => this.setState({selectedList: itemValue})}
				>
					<Picker.Item label='Choisir une liste' value={null} />
					{this.getPickers()}
				</Picker>
				{this.addButton()}
			</View>
			);
	}
}