import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {storeData, retrieveData, getStyleSheet} from './DataManager.js';

export default class CreateList extends React.Component
{
	constructor(props)
	{
	  super(props);

	  this.state = {
	  	listName: '',
	  	Style: null
	  };
	}

	saveList()
	{
		const name = this.state.listName;
		if (name !== undefined && name !== null && name.length > 0)
		{
			retrieveData('userData')
			.then((data) =>
			{
				data = JSON.parse(data);
				const newList = {
					id: data.nextId,
					name,
					movies: []
				};
				data.lists.unshift(newList);
				data.nextId++;
				data = JSON.stringify(data);
				storeData('userData', data);
			})
			.then(() =>
			{
				this.props.navigation.navigate('Home');
			})
			.catch(() => alert('Impossible d\'enregistrer la liste'));
		}
		else

			alert('Merci d\'entrer un nom valide');
	}

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Style => this.setState({Style})));
	}

	render()
	{
		if (this.state.Style === null)
			return (null);
		return (
			<View style={this.state.Style.globalContainer} >
				{this.state.Style.statusBar}
				<TextInput
					style={this.state.Style.inputText}
					value={this.state.listName}
					onChangeText={text => this.setState({listName: text})}
					autoFocus
					placeholder='Nom de la liste'
					maxLength={25}
					keyboardAppearance={this.state.Style.theme}
					autoCorrect={false} />
				<TouchableOpacity
					activeOpacity={0.7}
					style={this.state.Style.button}
					onPress={() => this.saveList()}>
					<Text style={this.state.Style.buttonText} >Créer</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
