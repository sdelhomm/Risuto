import React from 'react'
import { View, Text, TextInput, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native'
import Style from '../style/Style.js'
import Ionicons from 'react-native-vector-icons/Ionicons.js'
import {createStackNavigator} from 'react-navigation'
import MovieInfos from './MovieInfos.js'

class Result extends React.Component {

	textLimiter(text, max) {
		if (text.length > max) {
			text = text.substr(0, max);
			text = text + '...'
			return (text);
		}
		return (text);
	}

	render () {
		if (this.props.loading)
			return (<ActivityIndicator style={{marginVertical: 20}} size='large'/>);
		if (this.props.movieData === undefined || this.props.movieData === null)
			return (null);
		if (this.props.movieData == 'none')
			return (<Text>Aucun résultats trouvés</Text>);
		return (
			<FlatList
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			style={Style.results.flatList}
			data={this.props.movieData}
			renderItem={ ({item}) => (
				<TouchableOpacity
				onPress={ () => this.props.navigation.navigate('MovieInfos', { movieId: item.id })} //!\\
				activeOpacity={0.7}
				>
					<View style={Style.results.container} >
						<View style={Style.shadow} >
							<Image
							style={Style.results.image}
							source={{uri: 'http://image.tmdb.org/t/p/w92' + item.poster_path}}
							/>
						</View>
						<View style={Style.results.textContainer} >
							<Text style={Style.results.title} >{this.textLimiter(item.title, 16)}</Text>
							<Text style={Style.results.overview}>{this.textLimiter(item.overview, 124)}</Text>
						</View>
						<TouchableOpacity
						onPress={() => this.props.navigation.navigate('AddToList', {movieId: item.id, posterPath: item.poster_path})}
						activeOpacity={0.6}
						style={Style.results.addIcon}
						>
							<Ionicons name='ios-add' size={40} color='white' />
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
				)}
			keyExtractor={ (item) => item.id.toString()}
			/>
			);
	}
}

export default class Search extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isReady: true,
	  	dataSource: null
	  };
	}

	fetchMovie (text) {
		if (text.length < 2) {
			this.setState({
				isReady: true,
				dataSource: null
			});
			return ;
		}
		this.setState({
			isReady: false
		});
		return fetch('https://api.themoviedb.org/3/search/movie?api_key=6391f6cd254ef907e6975891ef627f61&language=fr&query=' + text)
		.then ( (response) => { return(response.json()); } )
		.then ( (responseJson) => {
			if (responseJson.total_results !== undefined && responseJson.total_results > 0) {
				this.setState({
					isReady: true,
					dataSource: responseJson.results.slice(0, 5)
				});
			}
			else {
				this.setState({
					isReady: true,
					dataSource: 'none'
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render () {
		return (
			<View style={Style.globalContainer} >
				<Text style={Style.title} >Rechercher un film</Text>
				<TextInput onChangeText={(text) => {this.fetchMovie(text)}} autoFocus={true} style={Style.inputText} placeholder='Ex: Titanic' />
				<Result navigation={this.props.navigation} movieData={this.state.dataSource} loading={!(this.state.isReady)} />
			</View>
			);
	}
}