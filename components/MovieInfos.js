import React from 'react'
import { ScrollView, View, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native'
import Style from '../style/Style.js'

export default class MovieInfos extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isReady: true,
	  	movieData: null
	  };
	}

	componentDidMount() {
		this.setState({
			isReady: false
		});
		return fetch('https://api.themoviedb.org/3/movie/'+ this.props.navigation.state.params.movieId +'?api_key=6391f6cd254ef907e6975891ef627f61&language=fr')
		.then( (response) => { return (response.json()); } )
		.then( (responseJson) => {
			if (responseJson !== undefined && responseJson !== null) {
				this.setState({
					isReady: true,
					movieData: responseJson
				});
			}
			else {
				this.setState({
					isReady: true,
					movieData: 'none'
				});
			}
		})
		.catch((error) =>{
			console.log(error);
		});
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

	delMovie (movieId, listId) {
		this.retrieveData('lists')
		.then((dataString) => JSON.parse(dataString))
		.then((dataObject) => {
			let listIndex = dataObject.lists.findIndex((element) => element.id == listId);
			let movieIndex = dataObject.lists[listIndex].movies.findIndex((element) => element.id == movieId);
			dataObject.lists[listIndex].movies.splice(movieIndex, 1);
			dataObject = JSON.stringify(dataObject);
			this.storeData('lists', dataObject);
		})
		.then(() => this.props.navigation.navigate('Home'))
		.catch(() => alert('Impossible de supprimer ce film'));
	}

	createButton () {
		if (this.props.navigation.state.params.from == 'list') {
			return (
				<TouchableOpacity
				onPress={() => this.delMovie (this.state.movieData.id, this.props.navigation.state.params.listId)}
				activeOpacity={0.7}
				style={Style.button} >
					<Text style={Style.buttonText} >Supprimer de cette liste</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
			onPress={() => this.props.navigation.navigate('AddToList', {movieId: this.state.movieData.id, posterPath: this.state.movieData.poster_path})}
			activeOpacity={0.7}
			style={Style.button} >
				<Text style={Style.buttonText} >Ajouter à une liste</Text>
			</TouchableOpacity>
		);
	}

	render () {
		if (!this.state.isReady)
			return (<View style={Style.movieInfos.globalView} >
						<ActivityIndicator size='large'/>
					</View>
				);
		if (this.state.movieData === undefined || this.state.movieData === null)
			return (null);
		if (this.state.movieData == 'none')
			return (<Text>Aucunes données trouvées</Text>);
		return (
			<ImageBackground
			style={{width: '100%', height: '100%'}}
			source={{uri: 'http://image.tmdb.org/t/p/w780' + this.state.movieData.poster_path}}
			blurRadius={10}
			>
				<ScrollView style={Style.movieInfos.scrollView} >
					<View style={Style.movieInfos.globalView} >
						<Image
						style={Style.movieInfos.headerImg}
						source={{uri: 'http://image.tmdb.org/t/p/w780' + this.state.movieData.backdrop_path}}
						/>
						<Text style={Style.movieInfos.title} >{this.state.movieData.title}</Text>
						{this.createButton()}
						<Text style={Style.movieInfos.overview} >{this.state.movieData.overview}</Text>
					</View>
				</ScrollView>
			</ImageBackground>
			);
	}
}