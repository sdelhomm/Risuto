import React from 'react';
import {View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StatusBar} from 'react-native';
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
				data.nextId += 1;
				data = JSON.stringify(data);
				storeData('userData', data);
			})
			.then(() =>
			{
				this.props.navigation.navigate('Home');
			})
			.catch(() => Alert.alert('Impossible d\'enregistrer la liste'));
		}
		else

			Alert.alert('Merci d\'entrer un nom valide');
	}

	componentDidMount()
	{
		this.props.navigation.addListener('willFocus', () => getStyleSheet().then(Styles => this.setState({Style: Styles})));
	}

	render()
	{
		if (this.state.Style === null)
		{
			getStyleSheet().then(Styles => this.setState({Style: Styles}));
			return (null);
		}
		StatusBar.setBarStyle(`${this.state.Style.unTheme}-content`);
		return (
			<View style={this.state.Style.globalContainer} >
				<TextInput
					underlineColorAndroid='transparent'
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
