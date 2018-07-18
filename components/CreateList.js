import React from 'react'
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import Style from '../style/Style.js'

export default class CreateList extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	listName: ''
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
				return ('{"'+item+'":[],"nextId":1}');
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	saveList() {
		let name = this.state.listName;
		if (name !== undefined && name !== null && name.length > 0) {
			this.retrieveData('lists')
			.then((data) => {
				data = JSON.parse(data);
				let newList = {
					id: data.nextId,
					name: name,
					movies: [{
						id: 0,
						posterPath: '/z13I3sWzOoKBDAEpJ7iK9bSznQn.jpg'
					}]
				};
				data.lists.push(newList);
				data.nextId++;
				data = JSON.stringify(data);
				this.storeData('lists', data);
			})
			.then(() => {
				this.props.navigation.state.params.refresh();
				this.props.navigation.navigate('Home');
			})
			.catch(() => alert('Impossible d\'enregistrer la liste'));
		}
		else {
			alert('Merci d\'entrer un nom valide');
		}
	}

	render () {
		return (
			<View style={Style.globalContainer} >
				<TextInput style={Style.inputText} value={this.state.listName} onChangeText={(text) => this.setState({listName: text})} autoFocus={true} placeholder='Nom de la liste' maxLength={20}/>
				<TouchableOpacity
				activeOpacity={0.7} 
				style={Style.button}
				onPress={() => this.saveList()}
				>
					<Text style={Style.buttonText} >Créer</Text>
				</TouchableOpacity>
			</View>
			);
	}
}