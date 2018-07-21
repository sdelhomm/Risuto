import React from 'react';
import {View, Text, TextInput, ActivityIndicator, FlatList, Image, TouchableOpacity, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import {getStyleSheet} from './DataManager.js';

class Result extends React.Component
{
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

	render()
	{
		if (this.props.loading)
			return (<ActivityIndicator style={this.props.Style.margin} size='large' />);
		if (this.props.movieData === undefined || this.props.movieData === null)
			return (null);
		if (this.props.movieData === 'none')
			return (<Text style={this.props.Style.results.noResults} >Aucun résultats trouvés</Text>);
		return (
			<FlatList
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={this.props.Style.results.flatList}
				data={this.props.movieData}
				renderItem={({item}) => (
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('MovieInfos', {movieId: item.id, from: 'search'})}
						activeOpacity={0.7}>
						<View style={this.props.Style.results.container} >
							<View style={this.props.Style.shadow} >
								<Image
									style={this.props.Style.results.image}
									source={{uri: `http://image.tmdb.org/t/p/w92${item.poster_path}`}} />
							</View>
							<View style={this.props.Style.results.textContainer} >
								<Text style={this.props.Style.results.title} >{this.textLimiter(item.title, 16)}</Text>
								<Text style={this.props.Style.results.overview}>{this.textLimiter(item.overview, 124)}</Text>
							</View>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('AddToList', {movieId: item.id, posterPath: item.poster_path})}
								activeOpacity={0.6}
								style={this.props.Style.results.addIcon}>
								<Ionicons name='ios-add' size={40} color='white' />
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={item => item.id.toString()} />
		);
	}
}

export default class Search extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			isReady: true,
			dataSource: null,
			Style: null
		};
	}

	fetchMovie(text)
	{
		if (text.length < 2)
		{
			this.setState({
				isReady: true,
				dataSource: null
			});
			return;
		}
		this.setState({
			isReady: false
		});
		return fetch(`https://api.themoviedb.org/3/search/movie?api_key=6391f6cd254ef907e6975891ef627f61&language=fr&query=${text}`)
		.then((response) => {return (response.json());})
		.then((responseJson) =>
		{
			if (responseJson.total_results !== undefined && responseJson.total_results > 0)
			{
				this.setState({
					isReady: true,
					dataSource: responseJson.results.slice(0, 5)
				});
			}
			else
			{
				this.setState({
					isReady: true,
					dataSource: 'none'
				});
			}
		})
		.catch((error) =>
		{
			console.log(error);
		});
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
				<Text style={this.state.Style.title} >Rechercher un film</Text>
				<TextInput
					underlineColorAndroid='transparent'
					onChangeText={(text) => {this.fetchMovie(text);}}
					autoFocus
					style={this.state.Style.inputText}
					placeholder='Ex: Titanic'
					keyboardAppearance={this.state.Style.theme}
					autoCorrect={false} />
				<Result navigation={this.props.navigation} movieData={this.state.dataSource} loading={!(this.state.isReady)} Style={this.state.Style} />
			</View>
		);
	}
}
